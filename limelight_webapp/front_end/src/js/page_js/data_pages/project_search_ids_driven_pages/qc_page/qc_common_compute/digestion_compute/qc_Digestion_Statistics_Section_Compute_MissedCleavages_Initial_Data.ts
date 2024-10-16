/**
 * qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data.ts
 *
 * QC Page Digestion Statistics Section : Compute: Missed Cleavages - Initial Data
 *
 * "Pre Compute" what will only change based on Single User Input
 *
 */

import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";


const TRYPSIN_CLEAVAGE_REGEX_PATTERN = "[KR][^P]";



/**
 *
 */
export class Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root {

    private _result_PerProjectSearchId_Map_Key_ProjectSearchId: Map<number,Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ProjectSearchId> = new Map();

    /**
     *
     */
    get_Result_ForSingle_ProjectSearchId( projectSearchId: number ) : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ProjectSearchId {
        return this._result_PerProjectSearchId_Map_Key_ProjectSearchId.get( projectSearchId );
    }

    /**
     *
     */
    add_Result_ForSingle_ProjectSearchId( item : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ProjectSearchId ) {
        this._result_PerProjectSearchId_Map_Key_ProjectSearchId.set( item.projectSearchId, item );
    }
}


/**
 *
 */
export class Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ProjectSearchId {

    readonly projectSearchId
    private _result_PerReportedPeptide_Map_Key_ReportedPeptideId: Map<number,Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide> = new Map();

    /**
     *
     * @param projectSearchId
     */
    constructor(
        {
            projectSearchId
        } : {
            projectSearchId: number
        }
    ) {
        this.projectSearchId = projectSearchId;
    }

    /**
     *
     */
    get_Result_ForSingle_ReportedPeptide( reportedPeptideId: number ) : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide {
        return this._result_PerReportedPeptide_Map_Key_ReportedPeptideId.get( reportedPeptideId );
    }

    /**
     *
     */
    add_Result_ForSingle_ReportedPeptide( item : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide ) {
        this._result_PerReportedPeptide_Map_Key_ReportedPeptideId.set( item.reportedPeptideId, item );
    }
}

/**
 *
 */
export class Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide {

    readonly reportedPeptideId: number;

    /**
     * Missed Cleavage Count using Reported Peptide level Variable Mods and Search Level Static Mods
     */
    private _missedCleavageCount = 0;

    private _result_PerPsm_Map_Key_PsmId: Map<number,Qc_SingleSearch_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_Psm> = new Map();

    /**
     *
     * @param reportedPeptideId
     * @param isMissedCleavage
     */
    constructor(
        {
            reportedPeptideId
        } : {
            reportedPeptideId: number
        }
    ) {
        this.reportedPeptideId = reportedPeptideId
    }

    /**
     * @returns if Missed Cleavage using Reported Peptide level Variable Mods and Search Level Static Mods
     */
    get_isMissedCleavage(): boolean {
        return this._missedCleavageCount > 0;
    }

    /**
     * @returns Count of Missed Cleavage using Reported Peptide level Variable Mods and Search Level Static Mods
     */
    get_missedCleavageCount(): number {
        return this._missedCleavageCount;
    }

    /**
     * ONLY for PSM with OPEN Mod with Position
     *
     * @returns
     */
    anyData_PerSingle_Psm() : boolean {
        return this._result_PerPsm_Map_Key_PsmId.size > 0
    }

    /**
     * Overrides Missed Cleavage Count at Reported Peptide level
     *
     * ONLY for PSM with OPEN Mod with Position
     *
     * @returns undefined if not added.  If returns undefined, use the value for the Reported Peptide
     */
    get_Result_ForSingle_Psm( psmId: number ) : Qc_SingleSearch_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_Psm {
        return this._result_PerPsm_Map_Key_PsmId.get( psmId );
    }

    //  ADD

    add_missedCleavageForCount() : void {
        this._missedCleavageCount++;
    }

    /**
     * ONLY for PSM with OPEN Mod with Position
     */
    add_Result_ForSingle_Psm( item : Qc_SingleSearch_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_Psm ) : void {
        this._result_PerPsm_Map_Key_PsmId.set( item.psmId, item );
    }

}

/**
 * Overrides Missed Cleavage Count at Reported Peptide level
 *
 * ONLY for PSM with OPEN Mod with Position
 */
export class Qc_SingleSearch_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_Psm {

    readonly psmId: number

    /**
     * Missed Cleavage Count using Reported Peptide level Variable Mods and Search Level Static Mods
     */
    private _missedCleavageCount = 0;

    /**
     *
     * @param reportedPeptideId
     * @param isMissedCleavage
     */
    constructor(
        {
            psmId
        } : {
            psmId: number
        }
    ) {
        this.psmId = psmId
    }

    /**
     * @returns if Missed Cleavage using Reported Peptide level Variable Mods and Search Level Static Mods
     */
    get_isMissedCleavage(): boolean {
        return this._missedCleavageCount > 0;
    }

    /**
     * @returns Count of Missed Cleavage using Reported Peptide level Variable Mods and Search Level Static Mods
     */
    get_missedCleavageCount(): number {
        return this._missedCleavageCount;
    }

    //  ADD

    add_missedCleavageForCount() : void {
        this._missedCleavageCount++;
    }
}


/**
 *
 * @param qcViewPage_CommonData_To_AllComponents_From_MainComponent
 * @param qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
 * @returns Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
 */
export const qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data = async function(
    {
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
) : Promise<Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root> {
    try {
        const result_Root = new Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root();

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;

        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

        for ( const projectSearchId of qcViewPage_CommonData_To_AllComponents_From_MainComponent.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts.get_ProjectSearchIds() ) {

            const qcPage_Flags = qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
            if ( ! qcPage_Flags ) {
                const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const get_reportedPeptideIds_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().
                get_reportedPeptideIds_ReturnPromise();

            const reportedPeptideIds = get_reportedPeptideIds_ReturnPromise_Result.reportedPeptideIds;

            if ( reportedPeptideIds.length === 0 ) {

                //  NO Peptides/PSMs for Search for current filters.  SKIP Search

                continue; //  EARLY CONTINUE
            }

            const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise();

            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise_Result.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;

            const get_StaticModsHolder_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__StaticModifications().get_StaticModsHolder_ReturnPromise()

            const staticMods_Holder = get_StaticModsHolder_ReturnPromise_Result.staticMods_Holder

            const get_PeptideIdsHolder_AllForSearch_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch_ReturnPromise();

            const peptideIds_For_MainFilters_Holder = get_PeptideIdsHolder_AllForSearch_ReturnPromise_Result.peptideIds_For_MainFilters_Holder;

            const get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer__CommonAcrossSearches().
                get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise();
            const peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise_Result.peptideSequences_For_MainFilters_Holder

            // Only populated when qcPage_Flags.anyPsmHas_OpenModifications is true

            let openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

            if ( qcPage_Flags.anyPsmHas_OpenModifications ) {

                const get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                    get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise();

                openModifications_On_PSM_For_MainFilters_Holder = get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise_Result.openModifications_On_PSM_For_MainFilters_Holder;
            }


            ///   AFTER Get Data

            const TRYPSIN_CLEAVAGE_REGEX = new RegExp(TRYPSIN_CLEAVAGE_REGEX_PATTERN, 'g' );

            const result_For_ProjectSearchId = new Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ProjectSearchId({ projectSearchId });
            result_Root.add_Result_ForSingle_ProjectSearchId( result_For_ProjectSearchId )

            for ( const reportedPeptideId of reportedPeptideIds ) {

                const result_ForSingle_ReportedPeptide = new Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide({ reportedPeptideId });
                result_For_ProjectSearchId.add_Result_ForSingle_ReportedPeptide( result_ForSingle_ReportedPeptide );

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId);
                if ( peptideId === undefined || peptideId === null ) {
                    const msg = "peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId({ reportedPeptideId }); returned nothing for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                const peptideSequenceString = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId );
                if ( peptideSequenceString === undefined || peptideSequenceString === null ) {
                    const msg = "peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId({ peptideId }); returned nothing for peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                //  Compute isMissedCleavage for reportedPeptideId

                const modificationLocations = new Set<number>();
                if ( variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries() ) {
                    const dynamicModifications = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId(reportedPeptideId);
                    if ( dynamicModifications ) {
                        for ( const dynamicModification of dynamicModifications ) {
                            modificationLocations.add(dynamicModification.position)
                        }
                    }
                }
                if ( staticMods_Holder.get_StaticMods() ) {
                    let staticModIndex = -2; // arbitrary initial value
                    for ( const staticMod of staticMods_Holder.get_StaticMods() ) {
                        let startSearchIndex = 0;
                        while ( ( staticModIndex = peptideSequenceString.indexOf( staticMod.residue, startSearchIndex ) ) != -1 ) {
                            let staticModPosition = staticModIndex + 1; // add "1" to index to get position which is "1" based
                            modificationLocations.add( staticModPosition );
                            startSearchIndex = staticModIndex + 1; // move startSearchIndex to after found staticModIndex
                        }
                    }
                }

                /**
                 * Missed Cleavages for Peptide, after considering Variable/Dynamic and Static modifications at those positions.
                 * Provided for PSM analysis
                 */
                let missedCleavagePositions_After_Remove_Varible_Dynamic_Static_Modifications_OneBased: Set<number> = undefined;
                if ( qcPage_Flags.anyPsmHas_OpenModifications ) {
                    missedCleavagePositions_After_Remove_Varible_Dynamic_Static_Modifications_OneBased = new Set<number>();
                }

                {
                    const matchesIterator = peptideSequenceString.matchAll( TRYPSIN_CLEAVAGE_REGEX );

                    for ( const match of matchesIterator ) {
                        const foundMatchPosition = match.index + 1;  //  positions are "1" based, so add "1"
                        if ( ! modificationLocations.has( foundMatchPosition ) ) {

                            result_ForSingle_ReportedPeptide.add_missedCleavageForCount();

                            if ( qcPage_Flags.anyPsmHas_OpenModifications ) {
                                missedCleavagePositions_After_Remove_Varible_Dynamic_Static_Modifications_OneBased.add(foundMatchPosition);
                            }
                        }
                    }
                }

                if ( qcPage_Flags.anyPsmHas_OpenModifications ) {

                    let psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId;

                    if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
                        //  Get the open mods where the mass does NOT round to zero
                        psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId =
                            openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);
                    } else {
                        //  Get the open mods without any exclusions
                        psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId =
                            openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);
                    }

                    if ( projectSearchId === 7280 ) {
                        var z = 0
                    }

                    if ( psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId ) {

                        for ( const psmOpenModificationMassPerPSM_ForPsmIdMapValue of psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.values() ) {

                            const psmId = psmOpenModificationMassPerPSM_ForPsmIdMapValue.psmId;
                            const result_ForSingle_Psm = new Qc_SingleSearch_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_Psm({ psmId });

                            if ( psmOpenModificationMassPerPSM_ForPsmIdMapValue.positionsMap_KeyPosition && psmOpenModificationMassPerPSM_ForPsmIdMapValue.positionsMap_KeyPosition.size > 0 ) {

                                const openModPositions = new Set<number>();

                                for ( const positionsMapValue of psmOpenModificationMassPerPSM_ForPsmIdMapValue.positionsMap_KeyPosition.values() ) {
                                    for ( const positionData of positionsMapValue ) {

                                        // positionData.position;
                                        // positionData.isNTerminal
                                        // positionData.isCTerminal

                                        openModPositions.add( positionData.position );
                                    }
                                }

                                for ( const missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased_Entry of missedCleavagePositions_After_Remove_Varible_Dynamic_Static_Modifications_OneBased ) {

                                    if ( openModPositions.size > 0 ) {

                                        //  Open mod is localized to 1 or more positions.

                                        //    OLD COMMENT THAT NO LONGER APPLIES:::  'else' of this 'if' would be: Open Mod is NOT localized, it can be at any position and thus no position can have missed cleavage

                                        if ( ! openModPositions.has( missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased_Entry ) ) {
                                            //  Missed cleavage is not at any of open mod positions so count it.  (Already above removed missed cleavage sites at Variable/Dynamic or Static Mod sites)
                                            result_ForSingle_Psm.add_missedCleavageForCount();
                                        }

                                    } else {
                                        //  NO Open Mod Positions - Open Mod NOT Localized - Position is missed cleavage

                                        result_ForSingle_Psm.add_missedCleavageForCount();
                                    }
                                }
                            } else {
                                //  NO Open Mod Positions - Open Mod NOT Localized - Position is missed cleavage

                                for ( const missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased_Entry of missedCleavagePositions_After_Remove_Varible_Dynamic_Static_Modifications_OneBased ) {

                                    result_ForSingle_Psm.add_missedCleavageForCount();
                                }
                            }

                            result_ForSingle_ReportedPeptide.add_Result_ForSingle_Psm(result_ForSingle_Psm);
                        }
                    }
                }
            }

        }

        return result_Root;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

