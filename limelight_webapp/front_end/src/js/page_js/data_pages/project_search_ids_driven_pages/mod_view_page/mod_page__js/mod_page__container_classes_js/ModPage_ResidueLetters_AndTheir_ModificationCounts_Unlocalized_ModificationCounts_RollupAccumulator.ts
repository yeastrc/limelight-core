/**
 * ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.ts
 *
 * Rollup Accumulator for Residue Letters and their PSM Counts.
 *
 * Also sum "Unlocalized" PSM count for when user selection specifies that.
 *
 * PSM Counts can be fractional for modifications that have > 1 position or do not have any position and thus are apportioned across the residues in the peptide.
 */
import {
    ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm";

/**
 *
 */
export class ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator {

    private _modificationCount__Map_Key_ModifiedResidueLetter: Map<string, {
        modificationCount: number
        modifiedResidueLetter: string
    }> = new Map()

    private _unlocalized_PsmIdSet: Set<number> = new Set()

    private _psmIds_Processed_Set: Set<number> = new Set()

    constructor(
        params? : {

        }
    ) {
    }


    // add_Unlocalized_PsmId(
    //     {
    //         psmId
    //     } : {
    //         psmId: number
    //     }
    // ) : void {
    //
    //     this._unlocalized_PsmIdSet.add( psmId )
    // }

    add__dataFor_SinglePsm__modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm(
        {
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm
        } : {
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm: ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm
        }
    ) : void {

        var z = 0

        if ( this._psmIds_Processed_Set.has( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.psmId ) ) {

            //  Processed PSM ID already so skip now

            return // EARLY RETURN
        }

        this._psmIds_Processed_Set.add( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.psmId )


        for ( const modificationCount_ModifiedResidueLetter_Entry of modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.get__ModificationCount_ModifiedResidueLetter_Entries() ) {

            let modificationCount_LocalEntry = this._modificationCount__Map_Key_ModifiedResidueLetter.get( modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter )
            if ( ! modificationCount_LocalEntry ) {
                modificationCount_LocalEntry = {
                    modifiedResidueLetter: modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter,
                    modificationCount: 0
                }
                this._modificationCount__Map_Key_ModifiedResidueLetter.set( modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter, modificationCount_LocalEntry )
            }
            modificationCount_LocalEntry.modificationCount += modificationCount_ModifiedResidueLetter_Entry.modificationCount
        }

        //
        // var z = 0
        //
        // if ( this._psmIds_Processed_Set.has( dataFor_SinglePsm.psmId ) ) {
        //
        //     //  Process PSM ID only once
        //
        //     return // EARLY RETURN
        // }
        //
        // this._psmIds_Processed_Set.add( dataFor_SinglePsm.psmId )
        //
        //
        // //  TODO   NOTE:  ON SOME FLAG, Separate out the Unlocalized into a separate value
        // //
        // //           TODO   Unlocalized is for > 1 position or NO positions
        //
        //
        // //  TODO   !!!!!!!!   This needs to be filtered on Protein Mod Position AND Protein Position filters   !!!!!!!!!!!!!!!!
        //
        // //                          TODO   THIS Protein Filtering needs to be restricted to a Single Protein Id when on or under that Protein Id
        //
        //
        //
        // //          TODO   Probably better to totally restructure this code.    Already doing Protein Mod Position AND Protein Position filtering elsewhere
        //
        //
        //
        // const peptideId_For_ReportedPeptideId = dataFor_SinglePsm.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( dataFor_SinglePsm.psmTblData.reportedPeptideId )
        // if ( ! peptideId_For_ReportedPeptideId ) {
        //     const msg = "dataFor_SinglePsm.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( dataFor_SinglePsm.psmTblData.reportedPeptideId ) returned NOTHING for dataFor_SinglePsm.psmTblData.reportedPeptideId: " + dataFor_SinglePsm.psmTblData.reportedPeptideId
        //     console.warn(msg)
        //     throw Error(msg)
        // }
        //
        // const peptideSequence_For_PeptideId = dataFor_SinglePsm.peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId )
        // if ( ! peptideSequence_For_PeptideId ) {
        //     const msg = "dataFor_SinglePsm.peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId ) returned NOTHING for peptideId_For_ReportedPeptideId: " + peptideId_For_ReportedPeptideId
        //     console.warn(msg)
        //     throw Error(msg)
        // }
        //
        // for ( const psmOpen_ModificationMass_Entry of dataFor_SinglePsm.get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entries() ) {
        //
        //     var z = 0
        //
        //     if ( psmOpen_ModificationMass_Entry.psmOpenModificationForPsmId.positionsMap_KeyPosition && psmOpen_ModificationMass_Entry.psmOpenModificationForPsmId.positionsMap_KeyPosition.size > 0 ) {
        //
        //         let totalPositionCount = 0
        //
        //         for ( const positionEntriesForPosition of psmOpen_ModificationMass_Entry.psmOpenModificationForPsmId.positionsMap_KeyPosition.values() ) {
        //
        //             totalPositionCount += positionEntriesForPosition.length
        //         }
        //
        //         if ( totalPositionCount > 1 ) {
        //
        //             var z = 0
        //         }
        //
        //         const countIncrement = 1 / totalPositionCount
        //
        //         for ( const positionEntriesForPosition of psmOpen_ModificationMass_Entry.psmOpenModificationForPsmId.positionsMap_KeyPosition.values() ) {
        //
        //             for ( const positionEntry of positionEntriesForPosition ) {
        //
        //                 const residueLetter = peptideSequence_For_PeptideId.substring( positionEntry.position - 1, positionEntry.position )  // -1 since position is 1 based
        //
        //                 let modifiedResidues__PsmCount__Map_Key_PsmId = this._modifiedResidues__ModificationCount__Map_Key_PsmId__Map_ModifiedResidueLetter.get( residueLetter )
        //                 if ( ! modifiedResidues__PsmCount__Map_Key_PsmId ) {
        //                     modifiedResidues__PsmCount__Map_Key_PsmId = new Map()
        //                     this._modifiedResidues__ModificationCount__Map_Key_PsmId__Map_ModifiedResidueLetter.set( residueLetter, modifiedResidues__PsmCount__Map_Key_PsmId )
        //                 }
        //
        //                 const modifiedResidues__PsmCount = modifiedResidues__PsmCount__Map_Key_PsmId.get( dataFor_SinglePsm.psmId )
        //                 if ( ! modifiedResidues__PsmCount ) {
        //                     modifiedResidues__PsmCount__Map_Key_PsmId.set( dataFor_SinglePsm.psmId, countIncrement )
        //                 } else {
        //                     modifiedResidues__PsmCount__Map_Key_PsmId.set( dataFor_SinglePsm.psmId, modifiedResidues__PsmCount + countIncrement )
        //                 }
        //             }
        //         }
        //
        //     } else {
        //
        //         const countIncrement = 1 / peptideSequence_For_PeptideId.length
        //
        //         for ( const residueLetter of peptideSequence_For_PeptideId ) {
        //
        //             let modifiedResidues__PsmCount__Map_Key_PsmId = this._modifiedResidues__ModificationCount__Map_Key_PsmId__Map_ModifiedResidueLetter.get( residueLetter )
        //             if ( ! modifiedResidues__PsmCount__Map_Key_PsmId ) {
        //                 modifiedResidues__PsmCount__Map_Key_PsmId = new Map()
        //                 this._modifiedResidues__ModificationCount__Map_Key_PsmId__Map_ModifiedResidueLetter.set( residueLetter, modifiedResidues__PsmCount__Map_Key_PsmId )
        //             }
        //
        //             const modifiedResidues__PsmCount = modifiedResidues__PsmCount__Map_Key_PsmId.get( dataFor_SinglePsm.psmId )
        //             if ( ! modifiedResidues__PsmCount ) {
        //                 modifiedResidues__PsmCount__Map_Key_PsmId.set( dataFor_SinglePsm.psmId, countIncrement )
        //             } else {
        //                 modifiedResidues__PsmCount__Map_Key_PsmId.set( dataFor_SinglePsm.psmId, modifiedResidues__PsmCount + countIncrement )
        //             }
        //         }
        //     }
        // }
        //
        // if ( dataFor_SinglePsm.get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Length() > 0 ) {
        //
        //     var z = 0
        //
        //     for ( const psmVariable_Dynamic_ModificationMass_Entry of dataFor_SinglePsm.get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Entries() ) {
        //
        //         var z = 0
        //
        //         const residueLetter = peptideSequence_For_PeptideId.substring( psmVariable_Dynamic_ModificationMass_Entry.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position - 1, psmVariable_Dynamic_ModificationMass_Entry.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position )  // -1 since position is 1 based
        //
        //         let modifiedResidues__PsmCount__Map_Key_PsmId = this._modifiedResidues__ModificationCount__Map_Key_PsmId__Map_ModifiedResidueLetter.get( residueLetter )
        //         if ( ! modifiedResidues__PsmCount__Map_Key_PsmId ) {
        //             modifiedResidues__PsmCount__Map_Key_PsmId = new Map()
        //             this._modifiedResidues__ModificationCount__Map_Key_PsmId__Map_ModifiedResidueLetter.set( residueLetter, modifiedResidues__PsmCount__Map_Key_PsmId )
        //         }
        //
        //         const countIncrement = 1
        //
        //         const modifiedResidues__PsmCount = modifiedResidues__PsmCount__Map_Key_PsmId.get( dataFor_SinglePsm.psmId )
        //         if ( ! modifiedResidues__PsmCount ) {
        //             modifiedResidues__PsmCount__Map_Key_PsmId.set( dataFor_SinglePsm.psmId, countIncrement )
        //         } else {
        //             modifiedResidues__PsmCount__Map_Key_PsmId.set( dataFor_SinglePsm.psmId, modifiedResidues__PsmCount + countIncrement )
        //         }
        //     }
        //
        // } else {
        //
        //     for ( const variable_Dynamic_Modification_Entry of dataFor_SinglePsm.get__variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry__Array_Entries() ) {
        //
        //         var z = 0
        //
        //         const residueLetter = peptideSequence_For_PeptideId.substring( variable_Dynamic_Modification_Entry.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position - 1, variable_Dynamic_Modification_Entry.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position )  // -1 since position is 1 based
        //
        //         let modifiedResidues__PsmCount__Map_Key_PsmId = this._modifiedResidues__ModificationCount__Map_Key_PsmId__Map_ModifiedResidueLetter.get( residueLetter )
        //         if ( ! modifiedResidues__PsmCount__Map_Key_PsmId ) {
        //             modifiedResidues__PsmCount__Map_Key_PsmId = new Map()
        //             this._modifiedResidues__ModificationCount__Map_Key_PsmId__Map_ModifiedResidueLetter.set( residueLetter, modifiedResidues__PsmCount__Map_Key_PsmId )
        //         }
        //
        //         const countIncrement = 1
        //
        //         const modifiedResidues__PsmCount = modifiedResidues__PsmCount__Map_Key_PsmId.get( dataFor_SinglePsm.psmId )
        //         if ( ! modifiedResidues__PsmCount ) {
        //             modifiedResidues__PsmCount__Map_Key_PsmId.set( dataFor_SinglePsm.psmId, countIncrement )
        //         } else {
        //             modifiedResidues__PsmCount__Map_Key_PsmId.set( dataFor_SinglePsm.psmId, modifiedResidues__PsmCount + countIncrement )
        //         }
        //     }
        // }
        // let psmIdSet = this._modifiedResidues_Map__Value_PsmIdSet_Key_ModifiedResidueLetter.get( residueLetter )
        // if ( ! psmIdSet ) {
        //     psmIdSet = new Set()
        //     this._modifiedResidues_Map__Value_PsmIdSet_Key_ModifiedResidueLetter.set( residueLetter, psmIdSet )
        // }
        //
        // psmIdSet.add( psmId )
    }


    // add_ResidueLetter_PsmId(
    //     {
    //         residueLetter, psmId
    //     } : {
    //         residueLetter: string
    //         psmId: number
    //     }
    // ) : void {
    //
    //     {
    //         const msg = "add_ResidueLetter_PsmId NOT IMPLEMENTED"
    //         console.warn(msg)
    //         throw Error(msg)
    //     }
    //
    //     // let psmIdSet = this._modifiedResidues_Map__Value_PsmIdSet_Key_ModifiedResidueLetter.get( residueLetter )
    //     // if ( ! psmIdSet ) {
    //     //     psmIdSet = new Set()
    //     //     this._modifiedResidues_Map__Value_PsmIdSet_Key_ModifiedResidueLetter.set( residueLetter, psmIdSet )
    //     // }
    //     //
    //     // psmIdSet.add( psmId )
    // }

    is_No_ResidueLetters(): boolean {

        // console.warn("is_No_ResidueLetters() needs to be replaced or otherwise rewritten")

        return this._modificationCount__Map_Key_ModifiedResidueLetter.size === 0
    }

    get_ResidueLetters() {
        return this._modificationCount__Map_Key_ModifiedResidueLetter.keys()
    }

    get_ModificationCount_For_ResidueLetter( residueLetter: string ) {

        const modificationCount__Map_Key_ModifiedResidueLetter_Entry = this._modificationCount__Map_Key_ModifiedResidueLetter.get( residueLetter )
        if ( ! modificationCount__Map_Key_ModifiedResidueLetter_Entry ) {
            return 0  // EARLY RETURN
        }

        return modificationCount__Map_Key_ModifiedResidueLetter_Entry.modificationCount
    }

    // get_PsmCount_For_Unlocalized() {
    //
    //     return this._unlocalized_PsmIdSet.size
    // }

    /**
     * Combine entries - One use (Currently Only Use)  is to combine for multiple searches or sub searches
     *
     * @param entries
     */
    static combine_ValuesInObjects( entries: Array<ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator>) : ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator {

        const newResult = new ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator()

        for ( const existingEntry of entries ) {

            for ( const existing_MapEntry of existingEntry._modificationCount__Map_Key_ModifiedResidueLetter.entries() ) {
                const residueLetter = existing_MapEntry[ 0 ]
                const existing_ModificationCountEntry = existing_MapEntry[ 1 ]

                let new_ModificationCountEntry_FromMap = newResult._modificationCount__Map_Key_ModifiedResidueLetter.get( residueLetter )
                if ( ! new_ModificationCountEntry_FromMap ) {
                    new_ModificationCountEntry_FromMap = {
                        modifiedResidueLetter: residueLetter,
                        modificationCount: 0
                    }
                    newResult._modificationCount__Map_Key_ModifiedResidueLetter.set( residueLetter, new_ModificationCountEntry_FromMap )
                }

                new_ModificationCountEntry_FromMap.modificationCount += existing_ModificationCountEntry.modificationCount
            }
        }

        return newResult
    }
}