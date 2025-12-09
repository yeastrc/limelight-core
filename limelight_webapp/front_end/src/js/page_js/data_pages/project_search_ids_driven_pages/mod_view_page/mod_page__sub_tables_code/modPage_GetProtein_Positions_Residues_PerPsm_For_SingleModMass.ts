/**
 * modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass.ts
 */


import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModPage_Mod_Unlocalized_StartEnd_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_Mod_Unlocalized_StartEnd_ContainerClass";
import {
    CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {
    CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {
    modPage_Create_GeneratedReportedPeptideEntries_String_Etc,
    ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters,
    ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Create_GeneratedReportedPeptideEntries_String_Etc";
import {
    OpenModPosition_DataType
} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm";
import {
    ModificationPosition_DataType
} from "page_js/data_pages/data_pages__common_data_types_typescript/modificationPosition_DataType_Typescript";
import {
    Limelight__ResiduePositions_n_c_Constants
} from "page_js/constants_across_webapp/residue_position_n_c_constants/Limelight__ResiduePositions_n_c_Constants";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_SinglePsmLevelOpenModification
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";

////////////////

export class ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root {

    private _data_For_SinglePsm_Map_Key_PsmId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm>

    constructor(
        {
            data_For_SinglePsm_Map_Key_PsmId
        } : {
            data_For_SinglePsm_Map_Key_PsmId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm>
        }
    ) {
        this._data_For_SinglePsm_Map_Key_PsmId = data_For_SinglePsm_Map_Key_PsmId
    }

    get_data_For_SinglePsm_For_PsmId( psmId: number ) {
        return this._data_For_SinglePsm_Map_Key_PsmId.get( psmId )
    }

}

/**
 * Passed to modPage_Get_PeptideList_ForModMassProteinAndSearch_SubTableGenerator.tsx
 *
 * which calls method 'get_GeneratedPeptide_Entries_For_PsmData' on this class
 *
 * while making the peptide list under:  mod mass bin / protein / (optional search or sub search)
 */
export class ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm {

    readonly dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm
    private _data_PerProtein_Map_Key_ProteinSequenceVersionId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein>

    /**
     * Data for call to function modPage_Create_GeneratedReportedPeptideEntries_String_Etc
     */
    private readonly _dataObject_ModPage_Create_GeneratedReportedPeptideString_InputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters

    private _data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

    private _projectSearchId_ForUseWhereRequire_projectSearchId: number

    constructor(
        {
            dataFor_SinglePsm, data_PerProtein_Map_Key_ProteinSequenceVersionId, data_For_ModMass, dataObject_ModPage_Create_GeneratedReportedPeptideString_InputParameters,
            projectSearchId_ForUseWhereRequire_projectSearchId
        } : {
            dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm
            data_PerProtein_Map_Key_ProteinSequenceVersionId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein>
            data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass
            dataObject_ModPage_Create_GeneratedReportedPeptideString_InputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters
            projectSearchId_ForUseWhereRequire_projectSearchId: number
        }
    ) {
        this.dataFor_SinglePsm = dataFor_SinglePsm
        this._data_PerProtein_Map_Key_ProteinSequenceVersionId = data_PerProtein_Map_Key_ProteinSequenceVersionId
        this._data_For_ModMass = data_For_ModMass
        this._dataObject_ModPage_Create_GeneratedReportedPeptideString_InputParameters = dataObject_ModPage_Create_GeneratedReportedPeptideString_InputParameters
        this._projectSearchId_ForUseWhereRequire_projectSearchId = projectSearchId_ForUseWhereRequire_projectSearchId
    }

    get_Data_PerProtein_For_ProteinSequenceVersionId_All() {
        return this._data_PerProtein_Map_Key_ProteinSequenceVersionId.values()
    }

    get_data_PerProtein_For_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {
        return this._data_PerProtein_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId )
    }

    get_GeneratedPeptide_Entries_For_PsmData(
        {
            proteinSequenceVersionId
        } : {
            proteinSequenceVersionId: number
        }
    ) : ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result {

        const data_ForProtein_ForSinglePsm = this._data_PerProtein_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId )
        if ( ! data_ForProtein_ForSinglePsm ) {
            throw Error("this._data_PerProtein_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId ) returned NOTHING for proteinSequenceVersionId: " + proteinSequenceVersionId )
        }

        return modPage_Create_GeneratedReportedPeptideEntries_String_Etc({
            proteinSequenceVersionId,
            data_ForProtein_ForSinglePsm,
            data_For_ModMass: this._data_For_ModMass,
            commonInputParameters: this._dataObject_ModPage_Create_GeneratedReportedPeptideString_InputParameters,
            projectSearchId_ForUseWhereRequire_projectSearchId: this._projectSearchId_ForUseWhereRequire_projectSearchId
        } )
    }
}



export class ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein {

    readonly proteinSequenceVersionId: number

    readonly modifiedPositions_VariableAndOpen_Modifications: Set<number> = new Set()
    readonly unlocalizedPositionRanges: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass> = []

    readonly modifiedResidues_VariableAndOpen_Modifications: Set<string> = new Set()

    readonly modifiedPositions_Variable_Modifications: Set<number> = new Set()
    readonly modifiedResidues_Variable_Modifications: Set<string> = new Set()

    /**
     * Populated when OpenMod Positions
     */
    readonly openMod_Position_Entries_Map_Key_PeptidePosition: Map<OpenModPosition_DataType, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein_OpenMod_Position_Entry> = new Map()

    /**
     * Populated when OpenMod Unlocalized
     */
    openMod_Unlocalized_Entry: ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein_OpenModUnlocalizedEntry

    /**
     * Residue Letters for before the peptide in the protein
     */
    readonly peptide_Pre_Residues: Set<string> = new Set()

    /**
     * Residue Letters for after the peptide in the protein
     */
    readonly peptide_Post_Residues: Set<string> = new Set()

    private _proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId: Map<number, Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>> = new Map()

    /**
     *
     * @param proteinSequenceVersionId
     */
    constructor( proteinSequenceVersionId: number ) {
        this.proteinSequenceVersionId = proteinSequenceVersionId
    }

    get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId(): ReadonlyMap<number, ReadonlyMap<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>> {
        return this._proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId
    }

    INTERNAL__get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable() {
        return this._proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId
    }
}



export class ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein_OpenMod_Position_Entry {

    readonly openModMass: number
    readonly peptidePosition_Or_n_c: number | string

    readonly proteinPositions: Set<number> = new Set()
    readonly residues: Set<string> = new Set()

    constructor(
        {
            openModMass, peptidePosition_Or_n_c
        } : {
            readonly openModMass: number
            readonly peptidePosition_Or_n_c: number | string
        }
    ) {
        this.openModMass = openModMass
        this.peptidePosition_Or_n_c = peptidePosition_Or_n_c
    }
}

export class ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein_OpenModUnlocalizedEntry {

    readonly openModMass: number
}

/////////////////////////
/////////////////////////
/////////////////////////


///   MAIN Function


export const modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass = async function (
    {
        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered,
        data_For_ModMass,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    }:{
        projectSearchId_Or_SubSearchId_Set_PossiblyFiltered: Set<number>

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
)  : Promise<ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root>
{ try {

    const data_For_SinglePsm_Map_Key_PsmId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm> = new Map()

    const projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set: Set<number> = new Set()

    for ( const data_ForSingle_ProjectSearchId_Or_SubSearchIds of data_For_ModMass.get_Data_AllValues() ) {

        projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set.add( data_ForSingle_ProjectSearchId_Or_SubSearchIds.projectSearchId_ForUseWhereRequire_projectSearchId )
    }

    const {
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        peptideSequences_For_MainFilters_Holder
    } = await
        _getProtein_Coverage_ETC_GetDataFromServer({
            projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

    const getProteinCoverage_For_ReportedPeptideId_ProjectSearchId__ObjectOfInternalClass__CachesResult = new INTERNAL__CachingResults_PerCallToTopLevelFunctionInThisFile__GetProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteringOn_ProteinPositionFilter_UserSelections_StateObject__CachingResults_Per_ProjectSearchId_ReportedPeptideId({
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId
    })


    for ( const data_ForSingle_ProjectSearchId_Or_SubSearchIds of data_For_ModMass.get_Data_AllValues() ) {

        const projectSearchId_Or_SubSearchId = data_ForSingle_ProjectSearchId_Or_SubSearchIds.projectSearchId_Or_SubSearchId

        if ( ! projectSearchId_Or_SubSearchId_Set_PossiblyFiltered.has( projectSearchId_Or_SubSearchId ) ) {
            //  Skip since not being included
            continue  // EARLY CONTINUE
        }

        const projectSearchId = data_ForSingle_ProjectSearchId_Or_SubSearchIds.projectSearchId_ForUseWhereRequire_projectSearchId

        //   Process a Single PSM for this Search or Sub Search for this top level Rounded Mod Mass Table entry

        for ( const dataFor_SinglePsm of  data_ForSingle_ProjectSearchId_Or_SubSearchIds.get_DataFor_SinglePsm_All() ) {

            const result__process_Single__dataFor_SinglePsm =
                _process_Single__dataFor_SinglePsm({

                    dataFor_SinglePsm,

                    projectSearchId,

                    data_ForSingle_ProjectSearchId_Or_SubSearchIds,
                    data_For_ModMass,

                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

                    getProteinCoverage_For_ReportedPeptideId_ProjectSearchId__ObjectOfInternalClass__CachesResult,

                    peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    peptideSequences_For_MainFilters_Holder
                })

            data_For_SinglePsm_Map_Key_PsmId.set( dataFor_SinglePsm.psmId, result__process_Single__dataFor_SinglePsm )
        }
    }

    const finalResult = new ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_Root({ data_For_SinglePsm_Map_Key_PsmId })

    return finalResult

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


/**
 * Process a Single  dataFor_SinglePsm
 */
const _process_Single__dataFor_SinglePsm = function (
    {
        dataFor_SinglePsm,

        projectSearchId,

        data_ForSingle_ProjectSearchId_Or_SubSearchIds,
        data_For_ModMass,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        getProteinCoverage_For_ReportedPeptideId_ProjectSearchId__ObjectOfInternalClass__CachesResult,

        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        peptideSequences_For_MainFilters_Holder
    } : {
        dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm

        projectSearchId: number

        data_ForSingle_ProjectSearchId_Or_SubSearchIds: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        getProteinCoverage_For_ReportedPeptideId_ProjectSearchId__ObjectOfInternalClass__CachesResult: INTERNAL__CachingResults_PerCallToTopLevelFunctionInThisFile__GetProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteringOn_ProteinPositionFilter_UserSelections_StateObject__CachingResults_Per_ProjectSearchId_ReportedPeptideId

        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
    }
) : ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm {

    if ( dataFor_SinglePsm.psmId === 725788503 ) {
        var z = 0
    }

    const reportedPeptideId_ForPSM = dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData.reportedPeptideId

    let peptideSequence_For_PeptideId: string

    {
        const peptides_For_ProjectSearchId = peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! peptides_For_ProjectSearchId ) {
            throw Error( "peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }
        const peptideId_For_reportedPeptideId_ForPSM = peptides_For_ProjectSearchId.get_PeptideId_For_ReportedPeptideId( reportedPeptideId_ForPSM )
        if ( ! peptideId_For_reportedPeptideId_ForPSM ) {
            throw Error( "peptides_For_ProjectSearchId.get_PeptideId_For_ReportedPeptideId( reportedPeptideId_ForPSM ) returned NOTHING for reportedPeptideId_ForPSM: " + reportedPeptideId_ForPSM + ", projectSearchId: " + projectSearchId )
        }
        peptideSequence_For_PeptideId = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_reportedPeptideId_ForPSM )
        if ( ! peptideSequence_For_PeptideId ) {
            throw Error( "peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_reportedPeptideId_ForPSM ) returned NOTHING for peptideSequence_For_PeptideId: " + peptideSequence_For_PeptideId + ", reportedPeptideId_ForPSM: " + reportedPeptideId_ForPSM + ", projectSearchId: " + projectSearchId )
        }
    }

    const proteinCoverage_For_ReportedPeptideId = getProteinCoverage_For_ReportedPeptideId_ProjectSearchId__ObjectOfInternalClass__CachesResult.get_ProteinCoverageEntries_FilteredOn__proteinPositionFilter_UserSelections_StateObject({ reportedPeptideId: reportedPeptideId_ForPSM, projectSearchId })
    if ( ! proteinCoverage_For_ReportedPeptideId ) {
        throw Error("getProteinCoverage_For_ReportedPeptideId_ProjectSearchId__ObjectOfInternalClass__CachesResult.get_ProteinCoverageEntries({ reportedPeptideId: reportedPeptideId_ForPSM, projectSearchId }) returned NOTHING for reportedPeptideId_ForPSM: " + reportedPeptideId_ForPSM + ", psmId: " + dataFor_SinglePsm.psmId )
    }

    const data_PerProtein_Map_Key_ProteinSequenceVersionId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein> = new Map()


    //  Process Modifications on PSM that round to the Parent Mod Mass in top level table

    //  Process PSM Open Modifications

    _process_Single__dataFor_SinglePsm__Psm_OpenModifications({

        dataFor_SinglePsm,

        data_For_ModMass,

        peptideSequence_For_PeptideId,

        proteinCoverage_For_ReportedPeptideId,

        data_PerProtein_Map_Key_ProteinSequenceVersionId,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    })

    //  Process PSM level Variable Modifications

    _process_Single__dataFor_SinglePsm__Psm_Level_VariableModifications({

        dataFor_SinglePsm,

        data_For_ModMass,

        peptideSequence_For_PeptideId,

        proteinCoverage_For_ReportedPeptideId,

        data_PerProtein_Map_Key_ProteinSequenceVersionId,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    })


    //  Process Reported Peptide level Variable Modifications

    _process_Single__dataFor_SinglePsm__ReportedPeptide_Level_VariableModifications({

            dataFor_SinglePsm,

            data_For_ModMass,

            peptideSequence_For_PeptideId,

            proteinCoverage_For_ReportedPeptideId,

            data_PerProtein_Map_Key_ProteinSequenceVersionId,

            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        })


    const dataObject_ModPage_Create_GeneratedReportedPeptideString_InputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters = {

        peptideSequence:  peptideSequence_For_PeptideId,
        reportedPeptideId: reportedPeptideId_ForPSM,
        dataFor_SinglePsm,
        data_For_ModMass,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }

    //  Add to Root Result object

    const result_For_SinglePsm = new ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm({
        dataFor_SinglePsm,
        data_PerProtein_Map_Key_ProteinSequenceVersionId,
        data_For_ModMass, dataObject_ModPage_Create_GeneratedReportedPeptideString_InputParameters,
        projectSearchId_ForUseWhereRequire_projectSearchId: data_ForSingle_ProjectSearchId_Or_SubSearchIds.projectSearchId_ForUseWhereRequire_projectSearchId
    })

    return result_For_SinglePsm
}

////////

/**
 * Process Single PSM --  PSM Open Modifications
 */
const _process_Single__dataFor_SinglePsm__Psm_OpenModifications = function (
    {
        dataFor_SinglePsm,

        data_For_ModMass,

        peptideSequence_For_PeptideId,

        proteinCoverage_For_ReportedPeptideId,

        data_PerProtein_Map_Key_ProteinSequenceVersionId,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } : {
        dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        peptideSequence_For_PeptideId: string

        proteinCoverage_For_ReportedPeptideId: Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>

        data_PerProtein_Map_Key_ProteinSequenceVersionId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein>

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) {

    //  Process OPEN Modifications on PSM

    for ( const psmOpenMod of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entries() ) {

        //  A Single Open Modification entry for this PSM.  This modification is counted once per protein.

        if ( ( ! psmOpenMod.psmOpenModificationForPsmId.positionsMap_KeyPosition ) || psmOpenMod.psmOpenModificationForPsmId.positionsMap_KeyPosition.size === 0 ) {

            //  Process Single PSM --  PSM Open Modifications --  Unlocalized  ( NO Modification Positions )

            _process_Single__dataFor_SinglePsm__Psm_OpenModification_Unlocalized__NO_Modification_Positions({

                dataFor_SinglePsm,

                data_For_ModMass,

                peptideSequence_For_PeptideId,

                proteinCoverage_For_ReportedPeptideId,

                data_PerProtein_Map_Key_ProteinSequenceVersionId,

                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
            })

        } else {

            //  Process Single PSM --  PSM Open Modifications --  Localized  ( YES Modification Positions )

            _process_Single__dataFor_SinglePsm__Psm_OpenModification_Localized__YES_Modification_Positions({

                psmOpenMod,

                dataFor_SinglePsm,

                data_For_ModMass,

                peptideSequence_For_PeptideId,

                proteinCoverage_For_ReportedPeptideId,

                data_PerProtein_Map_Key_ProteinSequenceVersionId,

                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
            })
        }
    }
}

//


/**
 * Process Single PSM --  PSM Open Modifications --  Unlocalized  ( NO Modification Positions )
 */
const _process_Single__dataFor_SinglePsm__Psm_OpenModification_Unlocalized__NO_Modification_Positions = function (
    {
        dataFor_SinglePsm,

        data_For_ModMass,

        peptideSequence_For_PeptideId,

        proteinCoverage_For_ReportedPeptideId,

        data_PerProtein_Map_Key_ProteinSequenceVersionId,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } : {
        dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        peptideSequence_For_PeptideId: string

        proteinCoverage_For_ReportedPeptideId: Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>

        data_PerProtein_Map_Key_ProteinSequenceVersionId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein>

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) {


    //  Open Mod is UNLOCALIZED

    //  Process Protein Coverage


    /**
     * All Peptide Positions for the proteins
     *
     * Peptide Positions.  Used for computing counts of modifications per peptide residue
     */
    const allPositions_OfThisPeptide_AreIncluded_For_ProteinSequenceVersionId_Entries_Set: Set<number> = new Set()

    /**
     *   Specific Peptide Positions for the proteins
     *
     *   Peptide Positions.  Used for computing counts of modifications per peptide residue
     */
    const peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId: Map<number, Map<ModificationPosition_DataType, number>> = new Map()


    for ( const proteinCoverage_Entry of proteinCoverage_For_ReportedPeptideId ) {


        let allPositions_OfThisPeptide_AreIncluded_ForThisProtein = false

        if ( ( ! all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() )
            && ( ! all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) ) {

            //  NO ProteinPosition_Of_Modification_Filter and NO ProteinPositionFilter

            //  ALL positions of Peptide are included in the result for this protein

            allPositions_OfThisPeptide_AreIncluded_ForThisProtein = true

        } else {

            //   Protein Position of Modification Filter

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

                //  Filter using proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )

                if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                    //  NO selection ranges for this proteinSequenceVersionId so SKIP
                    continue  // EARLY CONTINUE
                }

                if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                    //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                    //  ALL positions of Peptide are included in the result for this protein

                    allPositions_OfThisPeptide_AreIncluded_ForThisProtein = true

                } else {

                    //  NOT Selection 'fullProteinSelected'

                    allPositions_OfThisPeptide_AreIncluded_ForThisProtein = false  //  Reset to false since will apply filter positions

                    if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                        throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                    }

                    //  Since Modification is Unlocalized, look for any of peptide in the Protein selection

                    let found_peptidePosition_On_Protein__IN__Selection = false

                    for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                        const selectRange_Start = selection_RangeEntry.proteinPosition_Start;
                        const selectRange_End = selection_RangeEntry.proteinPosition_End;

                        //  x1 <= y2 && y1 <= x2
                        if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range

                            found_peptidePosition_On_Protein__IN__Selection = true


                            //    Compute peptide positions covered by the selection and store them

                            if ( selectRange_Start <= proteinCoverage_Entry.proteinStartPosition && selectRange_End >= proteinCoverage_Entry.proteinEndPosition ) {

                                //  Peptide is completely within the selected range so set to true allPositions_OfThisPeptide_AreIncluded_ForThisProtein

                                allPositions_OfThisPeptide_AreIncluded_ForThisProtein = true

                            } else {

                                //    Compute peptide positions covered by the selection and store them

                                //  Get for this proteinSequenceVersionId
                                let peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
                                if ( ! peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters ) {
                                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = new Map()
                                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.set( proteinCoverage_Entry.proteinSequenceVersionId, peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters )
                                }

                                //  Update with overlapping positions

                                for ( let position = proteinCoverage_Entry.proteinStartPosition; position <= proteinCoverage_Entry.proteinEndPosition; position++ ) {

                                    if ( position >= selectRange_Start && position <= selectRange_End ) {

                                        const peptidePosition = position - proteinCoverage_Entry.proteinStartPosition + 1  // peptidePosition is 1 based

                                        peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.set( peptidePosition, peptidePosition )
                                    }
                                }
                            }

                            //  Remove break to process all entries to get max overlap

                            //  Found in selection so 'break' to continue processing proteinCoverage_Entry
                            // break //  Break inner loop processing rangeEntries
                        }
                    }

                    if ( ! found_peptidePosition_On_Protein__IN__Selection ) {
                        //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                        continue // EARLY CONTINUE
                    }
                }
            }

            ////

            //   Protein Position Filter

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                //  Filter using proteinPositionFilter_UserSelections_StateObject

                //  Validate that the peptide overlaps the Protein Position to ensure only selected Proteins and Positions are displayed

                const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )

                if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                    //  NO selection ranges for this proteinSequenceVersionId so SKIP processing proteinCoverage_Entry
                    continue  // EARLY CONTINUE
                }

                if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                    //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                    allPositions_OfThisPeptide_AreIncluded_ForThisProtein = true

                } else {

                    //  NOT Selection 'fullProteinSelected'

                    allPositions_OfThisPeptide_AreIncluded_ForThisProtein = false  //  Reset to false since will apply filter positions

                    if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                        throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                    }

                    let found_peptidePosition_On_Protein__IN__Selection = false

                    for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                        const selectRange_Start = selection_RangeEntry.proteinPosition_Start;
                        const selectRange_End = selection_RangeEntry.proteinPosition_End;

                        //  x1 <= y2 && y1 <= x2
                        if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range

                            found_peptidePosition_On_Protein__IN__Selection = true

                            //    This is Protein Position filter so set 'all...' to true

                            allPositions_OfThisPeptide_AreIncluded_ForThisProtein = true
                        }

                        //  Found in selection so 'break' to continue processing proteinCoverage_Entry
                        break //  Break inner loop processing rangeEntries
                    }

                    if ( ! found_peptidePosition_On_Protein__IN__Selection ) {
                        //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                        continue // EARLY CONTINUE
                    }
                }
            }
        }

        //  ONLY Get to this point if none of the 'continue' statements above were executed OR neither filter had entries

        let data_ForProtein = data_PerProtein_Map_Key_ProteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
        if ( ! data_ForProtein ) {
            data_ForProtein = new ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein( proteinCoverage_Entry.proteinSequenceVersionId )
            data_PerProtein_Map_Key_ProteinSequenceVersionId.set( proteinCoverage_Entry.proteinSequenceVersionId, data_ForProtein )
        }

        data_ForProtein.peptide_Pre_Residues.add( proteinCoverage_Entry.protein_PreResidue )
        data_ForProtein.peptide_Post_Residues.add( proteinCoverage_Entry.protein_PostResidue )

        const unlocalized =
            new ModPage_Mod_Unlocalized_StartEnd_ContainerClass({ start: proteinCoverage_Entry.proteinStartPosition, end: proteinCoverage_Entry.proteinEndPosition })
        data_ForProtein.unlocalizedPositionRanges.push( unlocalized )

        data_ForProtein.openMod_Unlocalized_Entry = {
            openModMass: data_For_ModMass.modMass
        }

        {
            const proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable = data_ForProtein.INTERNAL__get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable()

            let proteinCoverage_Entry_Map_Key_ProteinStartPosition = proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable.get( proteinCoverage_Entry.reportedPeptideId )

            if ( ! proteinCoverage_Entry_Map_Key_ProteinStartPosition ) {
                proteinCoverage_Entry_Map_Key_ProteinStartPosition = new Map()
                proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable.set( proteinCoverage_Entry.reportedPeptideId, proteinCoverage_Entry_Map_Key_ProteinStartPosition )
            }
            proteinCoverage_Entry_Map_Key_ProteinStartPosition.set( proteinCoverage_Entry.proteinStartPosition, proteinCoverage_Entry )
        }
        {
            if ( allPositions_OfThisPeptide_AreIncluded_ForThisProtein ) {
                allPositions_OfThisPeptide_AreIncluded_For_ProteinSequenceVersionId_Entries_Set.add( proteinCoverage_Entry.proteinSequenceVersionId )
            }
        }
    }

    //   All Protein Coverage Entries processed.

    //   Populate the covered Peptide Residue Letters per Protein and store in the PSM


    //  Process proteinSequenceVersionId_Entry where ALL Positions of this Peptide are included

    for ( const proteinSequenceVersionId_Entry of allPositions_OfThisPeptide_AreIncluded_For_ProteinSequenceVersionId_Entries_Set ) {

        const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm =
            dataFor_SinglePsm.
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.
            get_modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__FOR__ProteinSequenceVersionId( proteinSequenceVersionId_Entry )

        for ( const peptideSequence_Letter of peptideSequence_For_PeptideId ) {

            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.add_modificationCount__NOT_Localized_Unlocalized__For_ModifiedResidueLetter( {
                modifiedResidueLetter: peptideSequence_Letter,
                modificationCountToAdd: ( 1 / peptideSequence_For_PeptideId.length )
            } )
        }
    }

    //  Process proteinSequenceVersionId_Entry where Specific Positions of this Peptide are included

    for ( const map_Entry of peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.entries() ) {

        const proteinSequenceVersionId_Entry = map_Entry[ 0 ]
        const peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = map_Entry[ 1 ]

        if ( allPositions_OfThisPeptide_AreIncluded_For_ProteinSequenceVersionId_Entries_Set.has( proteinSequenceVersionId_Entry ) ) {
            //  Already process for "ALL Positions" above so SKIP Here
            continue // EARLY CONTINUE
        }

        const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm =
            dataFor_SinglePsm.
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.
            get_modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__FOR__ProteinSequenceVersionId( proteinSequenceVersionId_Entry )

        for ( const peptidePosition_MapEntry of peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.entries() ) {

            // const peptidePosition_allow_n_c = peptidePosition_MapEntry[ 0 ]
            const peptidePosition_number_n_c_translated = peptidePosition_MapEntry[ 1 ]

            const peptidePosition = peptidePosition_number_n_c_translated  //  translated so 'n' is 1 and 'c' is last peptide position

            const peptideSequence_Letter = peptideSequence_For_PeptideId.substring( peptidePosition - 1, peptidePosition ) // peptidePosition is one based

            const modificationCountToAdd = 1 / peptideSequence_For_PeptideId.length

            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.add_modificationCount__NOT_Localized_Unlocalized__For_ModifiedResidueLetter( {
                modifiedResidueLetter: peptideSequence_Letter,
                modificationCountToAdd
            } )
        }
    }
}

///


/**
 * Process Single PSM --  PSM Open Modifications --  Localized  ( YES Modification Positions )
 */
const _process_Single__dataFor_SinglePsm__Psm_OpenModification_Localized__YES_Modification_Positions = function (
    {
        psmOpenMod,

        dataFor_SinglePsm,

        data_For_ModMass,

        peptideSequence_For_PeptideId,

        proteinCoverage_For_ReportedPeptideId,

        data_PerProtein_Map_Key_ProteinSequenceVersionId,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } : {
        psmOpenMod: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_SinglePsmLevelOpenModification

        dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        peptideSequence_For_PeptideId: string

        proteinCoverage_For_ReportedPeptideId: Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>

        data_PerProtein_Map_Key_ProteinSequenceVersionId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein>

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) {

    //  Open Modification YES Localized to one or more positions

    let openMod_MassEntry_PositionCount = 0  //  Total count of Positions for this Open Mod
    {
        for ( const entries_For_Position of psmOpenMod.psmOpenModificationForPsmId.positionsMap_KeyPosition.values() ) {
            openMod_MassEntry_PositionCount += entries_For_Position.length
        }
    }

    /**
     *   Specific Peptide Positions for the proteins
     *
     *   Peptide Positions.  Used for computing counts of modifications per peptide residue
     */
    const peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId: Map<number, Map<ModificationPosition_DataType, number>> = new Map()


    for ( const entries_For_Position of psmOpenMod.psmOpenModificationForPsmId.positionsMap_KeyPosition.values() ) {

        for ( const openMod_Entry_For_Position of entries_For_Position ) {

            let peptidePosition_Or_n_c: OpenModPosition_DataType =  openMod_Entry_For_Position.position
            if ( openMod_Entry_For_Position.isNTerminal ) {
                peptidePosition_Or_n_c = 'n'
            } else if ( openMod_Entry_For_Position.isCTerminal ) {
                peptidePosition_Or_n_c = 'c'
            }

            // position is set even if N or C flag is set
            const modificationPosition_On_Peptide = openMod_Entry_For_Position.position
            if ( modificationPosition_On_Peptide === undefined || modificationPosition_On_Peptide === null ) {
                throw Error( "openMod_Entry_For_Position.position is undefined or null" )
            }

            const residue_Letter_AtPosition = peptideSequence_For_PeptideId.substring( modificationPosition_On_Peptide - 1, modificationPosition_On_Peptide ) // -1 since position is 1 based

            //  Process Protein Coverage

            for ( const proteinCoverage_Entry of proteinCoverage_For_ReportedPeptideId ) {

                //  Any proteinCoverage_Entry that does NOT pass filters results in EARLY CONTINUE to skip to next proteinCoverage_Entry entry

                const modificationPosition_On_Protein = modificationPosition_On_Peptide + proteinCoverage_Entry.proteinStartPosition - 1


                if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

                    //  Filter using proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                    const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )

                    if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                        //  NO selection ranges for this proteinSequenceVersionId so SKIP
                        continue  // EARLY CONTINUE
                    }

                    if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                        //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                    } else {
                        if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                            throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                        }

                        let found_modificationPosition_On_Protein__IN__Selection = false

                        for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                            if ( selection_RangeEntry.proteinPosition_Start <= modificationPosition_On_Protein && modificationPosition_On_Protein <= selection_RangeEntry.proteinPosition_End ) {

                                found_modificationPosition_On_Protein__IN__Selection = true
                                //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                                break //  Break inner loop processing rangeEntries
                            }
                        }

                        if ( ! found_modificationPosition_On_Protein__IN__Selection ) {
                            //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                            continue // EARLY CONTINUE
                        }
                    }
                }

                if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                    //  Filter using proteinPositionFilter_UserSelections_StateObject

                    //  Validate that the peptide overlaps the Protein Position to ensure only selected Proteins and Positions are displayed

                    const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )

                    if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                        //  NO selection ranges for this proteinSequenceVersionId so SKIP
                        continue  // EARLY CONTINUE
                    }

                    if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                        //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                    } else {
                        if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                            throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                        }

                        let found_peptidePosition_On_Protein__IN__Selection = false

                        for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                            const selectRange_Start = selection_RangeEntry.proteinPosition_Start;
                            const selectRange_End = selection_RangeEntry.proteinPosition_End;

                            //  x1 <= y2 && y1 <= x2
                            if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range

                                found_peptidePosition_On_Protein__IN__Selection = true
                                //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                                break //  Break inner loop processing rangeEntries
                            }
                        }

                        if ( ! found_peptidePosition_On_Protein__IN__Selection ) {
                            //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                            continue // EARLY CONTINUE
                        }
                    }
                }

                let data_ForProtein = data_PerProtein_Map_Key_ProteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
                if ( ! data_ForProtein ) {
                    data_ForProtein = new ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein( proteinCoverage_Entry.proteinSequenceVersionId )
                    data_PerProtein_Map_Key_ProteinSequenceVersionId.set( proteinCoverage_Entry.proteinSequenceVersionId, data_ForProtein )
                }

                data_ForProtein.peptide_Pre_Residues.add( proteinCoverage_Entry.protein_PreResidue )
                data_ForProtein.peptide_Post_Residues.add( proteinCoverage_Entry.protein_PostResidue )

                data_ForProtein.modifiedResidues_VariableAndOpen_Modifications.add( residue_Letter_AtPosition )

                data_ForProtein.modifiedPositions_VariableAndOpen_Modifications.add( modificationPosition_On_Protein )


                let openMod_Position_Entry = data_ForProtein.openMod_Position_Entries_Map_Key_PeptidePosition.get( peptidePosition_Or_n_c )
                if ( ! openMod_Position_Entry ) {
                    openMod_Position_Entry = new ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein_OpenMod_Position_Entry({
                        openModMass: data_For_ModMass.modMass, peptidePosition_Or_n_c
                    })
                    data_ForProtein.openMod_Position_Entries_Map_Key_PeptidePosition.set( peptidePosition_Or_n_c, openMod_Position_Entry )
                }

                openMod_Position_Entry.proteinPositions.add( modificationPosition_On_Protein )
                openMod_Position_Entry.residues.add( residue_Letter_AtPosition )

                {
                    const proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable = data_ForProtein.INTERNAL__get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable()

                    let proteinCoverage_Entry_Map_Key_ProteinStartPosition = proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable.get( proteinCoverage_Entry.reportedPeptideId )

                    if ( ! proteinCoverage_Entry_Map_Key_ProteinStartPosition ) {
                        proteinCoverage_Entry_Map_Key_ProteinStartPosition = new Map()
                        proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable.set( proteinCoverage_Entry.reportedPeptideId, proteinCoverage_Entry_Map_Key_ProteinStartPosition )
                    }
                    proteinCoverage_Entry_Map_Key_ProteinStartPosition.set( proteinCoverage_Entry.proteinStartPosition, proteinCoverage_Entry )
                }

                {
                    //    Store peptide positions that have Modifications, separated by proteinSequenceVersionId.
                    //
                    //    Will count the peptide positions that have Modifications per proteinSequenceVersionId after all protein coverage records are processed

                    //  Get for this proteinSequenceVersionId
                    let peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
                    if ( ! peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters ) {
                        peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = new Map()
                        peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.set( proteinCoverage_Entry.proteinSequenceVersionId, peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters )
                    }

                    //  Separate out by N and C terminal since count them separately

                    {
                        let mapKey: ModificationPosition_DataType = openMod_Entry_For_Position.position
                        if ( openMod_Entry_For_Position.isNTerminal ) {
                            mapKey = Limelight__ResiduePositions_n_c_Constants.RESIDUE_POSITION__VALUE__N
                        } else if ( openMod_Entry_For_Position.isCTerminal ) {
                            mapKey = Limelight__ResiduePositions_n_c_Constants.RESIDUE_POSITION__VALUE__C
                        }
                        peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.set( mapKey, openMod_Entry_For_Position.position )
                    }
                }
            }
        }
    }  //  END OF:   for ( const entries_For_Position of psmOpenMod.psmOpenModificationForPsmId.positionsMap_KeyPosition.values() ) {

    //    Count the peptide positions that have Modifications per proteinSequenceVersionId after all protein coverage records are processed

    for ( const map_Entry of peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.entries() ) {

        const proteinSequenceVersionId_Entry = map_Entry[ 0 ]
        const peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = map_Entry[ 1 ]

        const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm =
            dataFor_SinglePsm.
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.
            get_modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__FOR__ProteinSequenceVersionId( proteinSequenceVersionId_Entry )

        for ( const peptidePosition_MapEntry of peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.entries() ) {

            // const peptidePosition_allow_n_c = peptidePosition_MapEntry[ 0 ]
            const peptidePosition_number_n_c_translated = peptidePosition_MapEntry[ 1 ]

            const peptidePosition = peptidePosition_number_n_c_translated  //  translated so 'n' is 1 and 'c' is last peptide position

            const peptideSequence_Letter = peptideSequence_For_PeptideId.substring( peptidePosition - 1, peptidePosition ) // peptidePosition is one based

            const modificationCountToAdd = 1 / openMod_MassEntry_PositionCount

            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.add_modificationCount__YES_Localized__For_ModifiedResidueLetter( {
                modifiedResidueLetter: peptideSequence_Letter,
                modificationCountToAdd
            } )
        }
    }
}


///////


/**
 * Process Single PSM --  PSM Level Variable Modifications
 */
const _process_Single__dataFor_SinglePsm__Psm_Level_VariableModifications = function (
    {
        dataFor_SinglePsm,

        data_For_ModMass,

        peptideSequence_For_PeptideId,

        proteinCoverage_For_ReportedPeptideId,

        data_PerProtein_Map_Key_ProteinSequenceVersionId,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } : {
        dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        peptideSequence_For_PeptideId: string

        proteinCoverage_For_ReportedPeptideId: Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>

        data_PerProtein_Map_Key_ProteinSequenceVersionId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein>

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) {

    //  Process Variable Modifications on PSM

    for ( const psmVariableMod of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Entries() ) {

        const _PSM_VARIABLE_MOD_POSITION_COUNT_ALWAYS_ONE = 1   // Change if position count is ever NOT 1

        /**
         *   Specific Peptide Positions for the proteins
         *
         *   Peptide Positions.  Used for computing counts of modifications per peptide residue
         */
        const peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId: Map<number, Map<ModificationPosition_DataType, number>> = new Map()


        // position is set even if N or C flag is set
        const modificationPosition_On_Peptide = psmVariableMod.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position
        if ( modificationPosition_On_Peptide === undefined || modificationPosition_On_Peptide === null ) {
            throw Error( "psmVariableMod.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position is undefined or null" )
        }

        const residue_Letter_AtPosition = peptideSequence_For_PeptideId.substring( modificationPosition_On_Peptide - 1, modificationPosition_On_Peptide ) // -1 since position is 1 based

        //  Process Protein Coverage

        for ( const proteinCoverage_Entry of proteinCoverage_For_ReportedPeptideId ) {

            const modificationPosition_On_Protein = modificationPosition_On_Peptide + proteinCoverage_Entry.proteinStartPosition - 1


            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

                //  Filter using proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )

                if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                    //  NO selection ranges for this proteinSequenceVersionId so SKIP
                    continue  // EARLY CONTINUE
                }

                if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                    //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                } else {
                    if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                        throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                    }

                    let found_modificationPosition_On_Protein__IN__Selection = false

                    for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                        if ( selection_RangeEntry.proteinPosition_Start <= modificationPosition_On_Protein && modificationPosition_On_Protein <= selection_RangeEntry.proteinPosition_End ) {

                            found_modificationPosition_On_Protein__IN__Selection = true
                            //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                            break //  Break inner loop processing rangeEntries
                        }
                    }

                    if ( ! found_modificationPosition_On_Protein__IN__Selection ) {
                        //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                        continue // EARLY CONTINUE
                    }
                }
            }


            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                //  Filter using proteinPositionFilter_UserSelections_StateObject

                const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )

                if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                    //  NO selection ranges for this proteinSequenceVersionId so SKIP
                    continue  // EARLY CONTINUE
                }

                if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                    //  Found in selection so 'break' to continue processing proteinCoverage_Entry
                    break  // EARLY BREAK

                } else {
                    if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                        throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                    }

                    let found_peptidePosition_On_Protein__IN__Selection = false

                    for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                        const selectRange_Start = selection_RangeEntry.proteinPosition_Start;
                        const selectRange_End = selection_RangeEntry.proteinPosition_End;

                        //  x1 <= y2 && y1 <= x2
                        if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range

                            found_peptidePosition_On_Protein__IN__Selection = true
                            //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                            break //  Break inner loop processing rangeEntries
                        }
                    }

                    if ( ! found_peptidePosition_On_Protein__IN__Selection ) {
                        //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                        continue // EARLY CONTINUE
                    }
                }
            }

            let data_ForProtein = data_PerProtein_Map_Key_ProteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
            if ( ! data_ForProtein ) {
                data_ForProtein = new ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein( proteinCoverage_Entry.proteinSequenceVersionId )
                data_PerProtein_Map_Key_ProteinSequenceVersionId.set( proteinCoverage_Entry.proteinSequenceVersionId, data_ForProtein )
            }

            data_ForProtein.peptide_Pre_Residues.add( proteinCoverage_Entry.protein_PreResidue )
            data_ForProtein.peptide_Post_Residues.add( proteinCoverage_Entry.protein_PostResidue )

            data_ForProtein.modifiedResidues_VariableAndOpen_Modifications.add( residue_Letter_AtPosition )
            data_ForProtein.modifiedResidues_Variable_Modifications.add( residue_Letter_AtPosition )

            data_ForProtein.modifiedPositions_VariableAndOpen_Modifications.add( modificationPosition_On_Protein )
            data_ForProtein.modifiedPositions_Variable_Modifications.add( modificationPosition_On_Protein )

            {
                const proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable = data_ForProtein.INTERNAL__get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable()

                let proteinCoverage_Entry_Map_Key_ProteinStartPosition = proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable.get( proteinCoverage_Entry.reportedPeptideId )

                if ( ! proteinCoverage_Entry_Map_Key_ProteinStartPosition ) {
                    proteinCoverage_Entry_Map_Key_ProteinStartPosition = new Map()
                    proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable.set( proteinCoverage_Entry.reportedPeptideId, proteinCoverage_Entry_Map_Key_ProteinStartPosition )
                }
                proteinCoverage_Entry_Map_Key_ProteinStartPosition.set( proteinCoverage_Entry.proteinStartPosition, proteinCoverage_Entry )
            }
            {
                //    Store peptide positions that have Modifications, separated by proteinSequenceVersionId.
                //
                //    Will count the peptide positions that have Modifications per proteinSequenceVersionId after all protein coverage records are processed

                //  Get for this proteinSequenceVersionId
                let peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
                if ( ! peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters ) {
                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = new Map()
                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.set( proteinCoverage_Entry.proteinSequenceVersionId, peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters )
                }

                //  Separate out by N and C terminal since count them separately

                if ( psmVariableMod.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.isNTerminal ) {

                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.set( Limelight__ResiduePositions_n_c_Constants.RESIDUE_POSITION__VALUE__N, psmVariableMod.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position )

                } else if ( psmVariableMod.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.isCTerminal ) {

                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.set( Limelight__ResiduePositions_n_c_Constants.RESIDUE_POSITION__VALUE__C, psmVariableMod.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position )

                } else {

                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.set( psmVariableMod.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position, psmVariableMod.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position )
                }
            }
        }

        //    Count the peptide positions that have Modifications per proteinSequenceVersionId after all protein coverage records are processed

        for ( const map_Entry of peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.entries() ) {

            const proteinSequenceVersionId_Entry = map_Entry[ 0 ]
            const peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = map_Entry[ 1 ]

            const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm =
                dataFor_SinglePsm.
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.
                get_modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__FOR__ProteinSequenceVersionId( proteinSequenceVersionId_Entry )

            for ( const peptidePosition_MapEntry of peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.entries() ) {

                // const peptidePosition_allow_n_c = peptidePosition_MapEntry[ 0 ]
                const peptidePosition_number_n_c_translated = peptidePosition_MapEntry[ 1 ]

                const peptidePosition = peptidePosition_number_n_c_translated  //  translated so 'n' is 1 and 'c' is last peptide position

                const peptideSequence_Letter = peptideSequence_For_PeptideId.substring( peptidePosition - 1, peptidePosition ) // peptidePosition is one based

                const modificationCountToAdd = 1 / _PSM_VARIABLE_MOD_POSITION_COUNT_ALWAYS_ONE

                modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.add_modificationCount__YES_Localized__For_ModifiedResidueLetter( {
                    modifiedResidueLetter: peptideSequence_Letter,
                    modificationCountToAdd
                } )
            }
        }
    }
}

/////

/**
 * Process Single PSM --  Reported Peptide Level Variable Modifications
 */
const _process_Single__dataFor_SinglePsm__ReportedPeptide_Level_VariableModifications = function (
    {
        dataFor_SinglePsm,

        data_For_ModMass,

        peptideSequence_For_PeptideId,

        proteinCoverage_For_ReportedPeptideId,

        data_PerProtein_Map_Key_ProteinSequenceVersionId,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } : {
        dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm

        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

        peptideSequence_For_PeptideId: string

        proteinCoverage_For_ReportedPeptideId: Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>

        data_PerProtein_Map_Key_ProteinSequenceVersionId: Map<number, ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein>

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) {

    for ( const variable_Dynamic_ModificationsOnReportedPeptide of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry__Array_Entries() ) {

        const _REPORTED_PEPTIDE_VARIABLE_MOD_POSITION_COUNT_ALWAYS_ONE = 1   // Change if position count is ever NOT 1

        /**
         *   Specific Peptide Positions for the proteins
         *
         *   Peptide Positions.  Used for computing counts of modifications per peptide residue
         */
        const peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId: Map<number, Map<ModificationPosition_DataType, number>> = new Map()


        // position is set even if N or C flag is set
        const modificationPosition_On_Peptide = variable_Dynamic_ModificationsOnReportedPeptide.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position
        if ( modificationPosition_On_Peptide === undefined || modificationPosition_On_Peptide === null ) {
            throw Error( "variable_Dynamic_ModificationsOnReportedPeptide.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position is undefined or null" )
        }

        const residue_Letter_AtPosition = peptideSequence_For_PeptideId.substring( modificationPosition_On_Peptide - 1, modificationPosition_On_Peptide ) // -1 since position is 1 based

        //  Process Protein Coverage

        for ( const proteinCoverage_Entry of proteinCoverage_For_ReportedPeptideId ) {

            const modificationPosition_On_Protein = modificationPosition_On_Peptide + proteinCoverage_Entry.proteinStartPosition - 1

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

                //  Filter using proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                const selections_Ranges_For_proteinSequenceVersionId =
                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.
                    getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )

                if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                    //  NO selection ranges for this proteinSequenceVersionId so SKIP
                    continue  // EARLY CONTINUE
                }

                if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                    //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                } else {
                    if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                        throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                    }

                    let found_modificationPosition_On_Protein__IN__Selection = false

                    for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                        if ( selection_RangeEntry.proteinPosition_Start <= modificationPosition_On_Protein && modificationPosition_On_Protein <= selection_RangeEntry.proteinPosition_End ) {

                            found_modificationPosition_On_Protein__IN__Selection = true
                            //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                            break //  Break inner loop processing rangeEntries
                        }
                    }

                    if ( ! found_modificationPosition_On_Protein__IN__Selection ) {
                        //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                        continue // EARLY CONTINUE
                    }
                }
            }

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                //  Filter using proteinPositionFilter_UserSelections_StateObject

                const selections_Ranges_For_proteinSequenceVersionId =
                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.
                    getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )

                if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                    //  NO selection ranges for this proteinSequenceVersionId so SKIP
                    continue  // EARLY CONTINUE
                }

                if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                    //  Found in selection so 'break' to continue processing proteinCoverage_Entry
                    break  // EARLY BREAK

                } else {
                    if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                        throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                    }

                    let found_peptidePosition_On_Protein__IN__Selection = false

                    for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                        const selectRange_Start = selection_RangeEntry.proteinPosition_Start;
                        const selectRange_End = selection_RangeEntry.proteinPosition_End;

                        //  x1 <= y2 && y1 <= x2
                        if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range

                            found_peptidePosition_On_Protein__IN__Selection = true
                            //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                            break //  Break inner loop processing rangeEntries
                        }
                    }

                    if ( ! found_peptidePosition_On_Protein__IN__Selection ) {
                        //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                        continue // EARLY CONTINUE
                    }
                }
            }

            let data_ForProtein = data_PerProtein_Map_Key_ProteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
            if ( ! data_ForProtein ) {
                data_ForProtein = new ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein( proteinCoverage_Entry.proteinSequenceVersionId )
                data_PerProtein_Map_Key_ProteinSequenceVersionId.set( proteinCoverage_Entry.proteinSequenceVersionId, data_ForProtein )
            }

            data_ForProtein.peptide_Pre_Residues.add( proteinCoverage_Entry.protein_PreResidue )
            data_ForProtein.peptide_Post_Residues.add( proteinCoverage_Entry.protein_PostResidue )

            data_ForProtein.modifiedResidues_VariableAndOpen_Modifications.add( residue_Letter_AtPosition )
            data_ForProtein.modifiedResidues_Variable_Modifications.add( residue_Letter_AtPosition )

            data_ForProtein.modifiedPositions_VariableAndOpen_Modifications.add( modificationPosition_On_Protein )
            data_ForProtein.modifiedPositions_Variable_Modifications.add( modificationPosition_On_Protein )

            {
                const proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable = data_ForProtein.INTERNAL__get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable()

                let proteinCoverage_Entry_Map_Key_ProteinStartPosition = proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable.get( proteinCoverage_Entry.reportedPeptideId )

                if ( ! proteinCoverage_Entry_Map_Key_ProteinStartPosition ) {
                    proteinCoverage_Entry_Map_Key_ProteinStartPosition = new Map()
                    proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId_Updatable.set( proteinCoverage_Entry.reportedPeptideId, proteinCoverage_Entry_Map_Key_ProteinStartPosition )
                }
                proteinCoverage_Entry_Map_Key_ProteinStartPosition.set( proteinCoverage_Entry.proteinStartPosition, proteinCoverage_Entry )
            }
            {
                //    Store peptide positions that have Modifications, separated by proteinSequenceVersionId.
                //
                //    Will count the peptide positions that have Modifications per proteinSequenceVersionId after all protein coverage records are processed

                //  Get for this proteinSequenceVersionId
                let peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
                if ( ! peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters ) {
                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = new Map()
                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.set( proteinCoverage_Entry.proteinSequenceVersionId, peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters )
                }

                //  Separate out by N and C terminal since count them separately

                if ( variable_Dynamic_ModificationsOnReportedPeptide.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.is_N_Terminal ) {

                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.set( Limelight__ResiduePositions_n_c_Constants.RESIDUE_POSITION__VALUE__N, variable_Dynamic_ModificationsOnReportedPeptide.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position )

                } else if ( variable_Dynamic_ModificationsOnReportedPeptide.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.is_C_Terminal ) {

                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.set( Limelight__ResiduePositions_n_c_Constants.RESIDUE_POSITION__VALUE__C, variable_Dynamic_ModificationsOnReportedPeptide.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position )

                } else {

                    peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.set( variable_Dynamic_ModificationsOnReportedPeptide.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position, variable_Dynamic_ModificationsOnReportedPeptide.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position )
                }
            }
        }

        //    Count the peptide positions that have Modifications per proteinSequenceVersionId after all protein coverage records are processed

        for ( const map_Entry of peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters_Map_Key_ProteinSequenceVersionId.entries() ) {

            const proteinSequenceVersionId_Entry = map_Entry[ 0 ]
            const peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters = map_Entry[ 1 ]

            const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm =
                dataFor_SinglePsm.
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.
                get_modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__FOR__ProteinSequenceVersionId( proteinSequenceVersionId_Entry )

            for ( const peptidePosition_MapEntry of peptidePositions_Map_Key_ModPosition_DataType_Allow_n_c__Pass_ProteinPositionModFilters.entries() ) {

                // const peptidePosition_allow_n_c = peptidePosition_MapEntry[ 0 ]
                const peptidePosition_number_n_c_translated = peptidePosition_MapEntry[ 1 ]

                const peptidePosition = peptidePosition_number_n_c_translated  //  translated so 'n' is 1 and 'c' is last peptide position

                const peptideSequence_Letter = peptideSequence_For_PeptideId.substring( peptidePosition - 1, peptidePosition ) // peptidePosition is one based

                const modificationCountToAdd = 1 / _REPORTED_PEPTIDE_VARIABLE_MOD_POSITION_COUNT_ALWAYS_ONE

                modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.add_modificationCount__YES_Localized__For_ModifiedResidueLetter( {
                    modifiedResidueLetter: peptideSequence_Letter,
                    modificationCountToAdd
                } )
            }
        }
    }

}






///////////////////////////


/**
 *
 */
const _getProtein_Coverage_ETC_GetDataFromServer = function (
    {
        projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }:{
        projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set: Set<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<{
    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
    peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
    peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
}>  { try {

    const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map()

    const peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder> = new Map()
    let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder


    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchId_ForUseWhereRequire_projectSearchId_ALL_Set ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        {
            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

            if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
            } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => reject(reason))
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        {  //  peptideIds_For_MainFilters_Holder
            const get_PeptideIdsHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();

            if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {
                peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder )
            } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PeptideIdsHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_PeptideIdsHolder_AllForSearch_Result.promise.then(value => { try {
                        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.peptideIds_For_MainFilters_Holder )
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PeptideIdsHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }
    }

    {  //  peptideSequences_For_MainFilters_Holder
        const get_PeptideSequencesHolder_AllForAllSearches_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer__CommonAcrossSearches().
            get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().get_PeptideSequencesHolder_AllForAllSearches()

        if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {
            peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder;
        } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => { try {
                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch(reason => {
                    reject(reason)
                })
                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then(value => { try {
                    peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder;
                    resolve();
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise)
        } else {
            throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result  no 'data' or 'promise'")
        }
    }

    if ( promises.length === 0 ) {

        return Promise.resolve({
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder
        })
    }

    const promisesAll = Promise.all( promises )

    return new Promise<{
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
    }>( (resolve, reject) =>  { try {

        promisesAll.catch(reason => reject(reason))
        promisesAll.then(novalue => { try {

            resolve({
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                peptideSequences_For_MainFilters_Holder
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


////////////////////

class INTERNAL__CachingResults_PerCallToTopLevelFunctionInThisFile__GetProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteringOn_ProteinPositionFilter_UserSelections_StateObject__CachingResults_Per_ProjectSearchId_ReportedPeptideId {

    private _proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
    private _all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    private _cachedResults__ProteinCoverage_FilteredData_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId: Map<number, Map<number, Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>>> = new Map()

    constructor(
        {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        }: {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        }
    ) {
        this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId
        this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }

    /**
     * Get Protein Coverage Entries - Filter on proteinPositionFilter_UserSelections_StateObject
     *
     * @param reportedPeptideId
     * @param projectSearchId
     */
    get_ProteinCoverageEntries_FilteredOn__proteinPositionFilter_UserSelections_StateObject(
        {
            reportedPeptideId, projectSearchId
        }: {
            reportedPeptideId: number
            projectSearchId: number
        }
    ) {

        {
            const dataFor_projectSearchId = this._cachedResults__ProteinCoverage_FilteredData_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( dataFor_projectSearchId ) {
                const dataFor_reportedPeptideId = dataFor_projectSearchId.get( reportedPeptideId )

                if ( dataFor_reportedPeptideId ) {
                    //  Have in cache so return
                    return dataFor_reportedPeptideId  // EARLY RETURN
                }
            }
        }

        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder =
            this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
            throw Error( "this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId" )
        }

        const proteinCoverage_For_ReportedPeptideId_UnFiltered =
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId )
        if ( ! proteinCoverage_For_ReportedPeptideId_UnFiltered ) {
            throw Error( "proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId_ForPSM ) returned NOTHING for reportedPeptideId: " + reportedPeptideId )
        }


        let proteinCoverage_For_ReportedPeptideId_Result = proteinCoverage_For_ReportedPeptideId_UnFiltered

        if (  this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

            //  YES Selections create Filtered Array and Overlay "Result"

            const proteinCoverage_For_ReportedPeptideId_YES_Filtered: Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry> = []

            for ( const proteinCoverage_Entry of proteinCoverage_For_ReportedPeptideId_UnFiltered ) {

                const rangeEntries_For_proteinSequenceVersionId = this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
                if ( rangeEntries_For_proteinSequenceVersionId ) {
                    if ( rangeEntries_For_proteinSequenceVersionId.fullProteinSelected ) {

                        // ADD to Filtered Protein Coverage Entries

                        proteinCoverage_For_ReportedPeptideId_YES_Filtered.push( proteinCoverage_Entry )

                    } else if ( ! rangeEntries_For_proteinSequenceVersionId.rangeEntries ) {
                        throw Error( "proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId ) returned object with NO 'fullProteinSelected' or 'rangeEntries' properties.  proteinCoverage_Entry.proteinSequenceVersionId:" + proteinCoverage_Entry.proteinSequenceVersionId )
                    } else if ( rangeEntries_For_proteinSequenceVersionId.rangeEntries.length === 0 ) {
                        throw Error( "proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId ) returned object with 'rangeEntries' property of length zero.  proteinCoverage_Entry.proteinSequenceVersionId:" + proteinCoverage_Entry.proteinSequenceVersionId )
                    } else {

                        // Process Range Entries

                        let found_ProteinPositionFilter_For_ProteinCoverage_Entry = false

                        for ( const proteinPositionFilter_UserSelections_RangeEntry of rangeEntries_For_proteinSequenceVersionId.rangeEntries ) {

                            const selectRange_Start = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_Start;
                            const selectRange_End = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_End;

                            //  x1 <= y2 && y1 <= x2
                            if ( selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End ) { // coverage entry overlaps select range
                                found_ProteinPositionFilter_For_ProteinCoverage_Entry = true;
                                break
                            }
                        }

                        if ( found_ProteinPositionFilter_For_ProteinCoverage_Entry ) {

                            // ADD to Filtered Protein Coverage Entries

                            proteinCoverage_For_ReportedPeptideId_YES_Filtered.push( proteinCoverage_Entry )
                        }
                    }
                }
            }

            proteinCoverage_For_ReportedPeptideId_Result = proteinCoverage_For_ReportedPeptideId_YES_Filtered
        }

        //  ADD result to the Cache

        let dataFor_projectSearchId = this._cachedResults__ProteinCoverage_FilteredData_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! dataFor_projectSearchId ) {
            dataFor_projectSearchId = new Map()
            this._cachedResults__ProteinCoverage_FilteredData_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, dataFor_projectSearchId )
        }
        dataFor_projectSearchId.set( reportedPeptideId, proteinCoverage_For_ReportedPeptideId_Result )

        return proteinCoverage_For_ReportedPeptideId_Result
    }
}







/**
 *
 * @param modificationPositions_OnPeptide_ThatPassFilters
 * @param peptideIds_For_MainFilters_Holder
 * @param peptideSequences_For_MainFilters_Holder
 */
const _compute_modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm__FROM__modificationPositions_OnPeptide_ThatPassFilters = function (
    {
        modificationPositions_OnPeptide_ThatPassFilters,
        modificationPositions_OnPeptide,
        psmTblData,
        peptideIds_For_MainFilters_Holder, peptideSequences_For_MainFilters_Holder
    } : {
        modificationPositions_OnPeptide_ThatPassFilters: Set<number>
        modificationPositions_OnPeptide: Array<number>
        psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
        peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
    }
) : ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm
{

    const peptideId_For_ReportedPeptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmTblData.reportedPeptideId )
    if ( ! peptideId_For_ReportedPeptideId ) {
        throw Error("peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( dataFor_SinglePsm_For_PsmId.psmTblData.reportedPeptideId ) returned NOTHING for psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId )
    }

    const peptideSequence_For_PeptideId = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId )
    if ( ! peptideSequence_For_PeptideId ) {
        throw Error("peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId ) returned NOTHING for peptideId_For_ReportedPeptideId: " + peptideId_For_ReportedPeptideId + ", psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId )
    }


    const fraction = 1 / modificationPositions_OnPeptide.length


    const modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm =
        new ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm({ psmId: psmTblData.psmId })

    for ( const modificationPosition of modificationPositions_OnPeptide_ThatPassFilters ) {

        const modificationCountToAdd = fraction
        const modifiedResidueLetter = peptideSequence_For_PeptideId.substring( modificationPosition - 1, modificationPosition ) //  Start at 'modificationPosition - 1' since modificationPosition is 1 based

        modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.add_modificationCount__NOT_Localized_Unlocalized__For_ModifiedResidueLetter( {
            modificationCountToAdd,
            modifiedResidueLetter
        })
    }

    return modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm
}
