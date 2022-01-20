/**
 * qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data.ts
 *
 * QC Page Digestion Statistics Section : Compute: Missed Cleavages - Initial Data
 *
 * "Pre Compute" what will only change based on Single User Input
 *
 */

import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";


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
export const qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data = function(
    {
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
) : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root {

    const result_Root = new Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root();

    const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;

    const loadedDataCommonHolder = qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataCommonHolder;

    for ( const projectSearchId of qcViewPage_CommonData_To_AllComponents_From_MainComponent.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts.get_ProjectSearchIds() ) {

        const qcPage_Flags = qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
        if ( ! qcPage_Flags ) {
            const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        const loadedDataPerProjectSearchIdHolder = qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }


        if ( loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds().length === 0 ) {

            //  NO Peptides/PSMs for Search for current filters.  SKIP Search

            continue; //  EARLY CONTINUE
        }


        const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();
        // if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {
        //     const msg = "loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId(); returned nothing. projectSearchId: " + projectSearchId;
        //     console.warn(msg);
        //     throw Error(msg);
        // }
        const staticMods = loadedDataPerProjectSearchIdHolder.get_staticMods()
        // if ( ! staticMods ) {
        //     const msg = "loadedDataPerProjectSearchIdHolder.get_staticMods(); returned nothing. projectSearchId: " + projectSearchId;
        //     console.warn(msg);
        //     throw Error(msg);
        // }

        ///

        const TRYPSIN_CLEAVAGE_REGEX = new RegExp(TRYPSIN_CLEAVAGE_REGEX_PATTERN, 'g' );

        const result_For_ProjectSearchId = new Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ProjectSearchId({ projectSearchId });
        result_Root.add_Result_ForSingle_ProjectSearchId( result_For_ProjectSearchId )

        for ( const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() ) {

            const result_ForSingle_ReportedPeptide = new Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide({ reportedPeptideId });
            result_For_ProjectSearchId.add_Result_ForSingle_ReportedPeptide( result_ForSingle_ReportedPeptide );

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({ reportedPeptideId });
            if ( peptideId === undefined || peptideId === null ) {
                const msg = "loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({ reportedPeptideId }); returned nothing for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const peptideSequenceString = loadedDataCommonHolder.get_peptideSequenceString_For_peptideId({ peptideId });
            if ( peptideSequenceString === undefined || peptideSequenceString === null ) {
                const msg = "loadedDataCommonHolder.get_peptideSequenceString_For_peptideId({ peptideId }); returned nothing for peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            //  Compute isMissedCleavage for reportedPeptideId

            const modificationLocations = new Set<number>();
            if ( dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {
                const dynamicModifications = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
                if ( dynamicModifications ) {
                    for ( const dynamicModification of dynamicModifications ) {
                        modificationLocations.add(dynamicModification.position)
                    }
                }
            }
            if ( staticMods ) {
                let staticModIndex = -2; // arbitrary initial value
                for ( const staticMod of staticMods ) {
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

                let psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()

                if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
                    //  Get the open mods where the mass does NOT round to zero
                    psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()
                }

                if ( psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {

                    const psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId = psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId )

                    if ( psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId ) {

                        for ( const psmOpenModificationMassPerPSM_ForPsmIdMapValue of psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.values() ) {

                            const psmId = psmOpenModificationMassPerPSM_ForPsmIdMapValue.psmId;
                            const result_ForSingle_Psm = new Qc_SingleSearch_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_Psm({ psmId });

                            if ( psmOpenModificationMassPerPSM_ForPsmIdMapValue.positionsMap_KeyPosition ) {

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

                                        //    'else' of this 'if' would be: Open Mod is NOT localized, it can be at any position and thus no position can have missed cleavage

                                        if ( ! openModPositions.has( missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased_Entry ) ) {
                                            //  Missed cleavage is not at any of open mod positions so count it.  (Already above removed missed cleavage sites at Variable/Dynamic or Static Mod sites)
                                            result_ForSingle_Psm.add_missedCleavageForCount();
                                        }
                                    }
                                }
                            }

                            result_ForSingle_ReportedPeptide.add_Result_ForSingle_Psm(result_ForSingle_Psm);
                        }
                    }
                }
            }
        }

    }

    return result_Root;
}

