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

    private _modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter: Map<string, {
        modificationCount: number
        modifiedResidueLetter: string
    }> = new Map()

    private _modificationCount__NOT_Localized_Unlocalized_Modifications__Map_Key_ModifiedResidueLetter: Map<string, {
        modificationCount: number
        modifiedResidueLetter: string
    }> = new Map()

    private _modifiedResidueLetter_All_Localized_AND_Unlocalized: Set<string> = new Set()

    private _psmIds_Processed_Set: Set<number> = new Set()

    constructor(
        params? : {

        }
    ) {
    }

    add__dataFor_SinglePsm__modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm(
        {
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm
        } : {
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm: ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm
        }
    ) : void {

        if ( this._psmIds_Processed_Set.has( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.psmId ) ) {

            //  Processed PSM ID already so skip now

            return // EARLY RETURN
        }

        this._psmIds_Processed_Set.add( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.psmId )


        for (
            const modificationCount_ModifiedResidueLetter_Entry
            of
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.get_YES_Localized_Modifications__ModificationCount_ModifiedResidueLetter_Entries() ) {

            this._modifiedResidueLetter_All_Localized_AND_Unlocalized.add( modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter )

            let modificationCount_LocalEntry = this._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.get( modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter )
            if ( ! modificationCount_LocalEntry ) {
                modificationCount_LocalEntry = {
                    modifiedResidueLetter: modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter,
                    modificationCount: 0
                }
                this._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.set( modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter, modificationCount_LocalEntry )
            }
            modificationCount_LocalEntry.modificationCount += modificationCount_ModifiedResidueLetter_Entry.modificationCount
        }

        for (
            const modificationCount_ModifiedResidueLetter_Entry
            of
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.get_NOT_Localized_Unlocalized__Modifications__ModificationCount_ModifiedResidueLetter_Entries() ) {

            this._modifiedResidueLetter_All_Localized_AND_Unlocalized.add( modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter )

            let modificationCount_LocalEntry = this._modificationCount__NOT_Localized_Unlocalized_Modifications__Map_Key_ModifiedResidueLetter.get( modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter )
            if ( ! modificationCount_LocalEntry ) {
                modificationCount_LocalEntry = {
                    modifiedResidueLetter: modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter,
                    modificationCount: 0
                }
                this._modificationCount__NOT_Localized_Unlocalized_Modifications__Map_Key_ModifiedResidueLetter.set( modificationCount_ModifiedResidueLetter_Entry.modifiedResidueLetter, modificationCount_LocalEntry )
            }
            modificationCount_LocalEntry.modificationCount += modificationCount_ModifiedResidueLetter_Entry.modificationCount
        }
    }

    ///////////////

    /**
     *
     */
    is_No_ResidueLetters(): boolean {

        // console.warn("is_No_ResidueLetters() needs to be replaced or otherwise rewritten")

        return (
            this._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.size === 0 &&
            this._modificationCount__NOT_Localized_Unlocalized_Modifications__Map_Key_ModifiedResidueLetter.size === 0
        )
    }

    /**
     *
     */
    get_ResidueLetters() {
        return this._modifiedResidueLetter_All_Localized_AND_Unlocalized.values()
    }

    /**
     *
     * @param residueLetter
     */
    get_ModificationCount_For_ResidueLetter( residueLetter: string ) {

        let result = 0

        {
            const modificationCount__Map_Key_ModifiedResidueLetter_Entry = this._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.get( residueLetter )

            if ( modificationCount__Map_Key_ModifiedResidueLetter_Entry ) {
                result += modificationCount__Map_Key_ModifiedResidueLetter_Entry.modificationCount
            }
        }
        {
            const modificationCount__Map_Key_ModifiedResidueLetter_Entry = this._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.get( residueLetter )

            if ( modificationCount__Map_Key_ModifiedResidueLetter_Entry ) {
                result += modificationCount__Map_Key_ModifiedResidueLetter_Entry.modificationCount
            }
        }

        return result
    }

    /**
     *
     * @param residueLetter
     */
    get_ModificationCount_For_ResidueLetter__YES_Localized_Modifications( residueLetter: string ) {

        let result = 0

        {
            const modificationCount__Map_Key_ModifiedResidueLetter_Entry = this._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.get( residueLetter )

            if ( modificationCount__Map_Key_ModifiedResidueLetter_Entry ) {
                result += modificationCount__Map_Key_ModifiedResidueLetter_Entry.modificationCount
            }
        }

        return result
    }

    /**
     *
     * @param residueLetter
     */
    get_ModificationCount_For_ResidueLetter__NOT_Localized_Unlocalized( residueLetter: string ) {

        let result = 0

        {
            const modificationCount__Map_Key_ModifiedResidueLetter_Entry = this._modificationCount__NOT_Localized_Unlocalized_Modifications__Map_Key_ModifiedResidueLetter.get( residueLetter )

            if ( modificationCount__Map_Key_ModifiedResidueLetter_Entry ) {
                result += modificationCount__Map_Key_ModifiedResidueLetter_Entry.modificationCount
            }
        }

        return result
    }

    ////////////

    /**
     * Combine entries - One use (Currently Only Use)  is to combine for multiple searches or sub searches
     *
     * @param entries
     */
    static combine_ValuesInObjects( entries: Array<ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator>) : ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator {

        const newResult = new ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator()

        for ( const existingEntry of entries ) {

            for ( const existing_MapEntry of existingEntry._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.entries() ) {
                const residueLetter = existing_MapEntry[ 0 ]
                const existing_ModificationCountEntry = existing_MapEntry[ 1 ]

                let new_ModificationCountEntry_FromMap = newResult._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.get( residueLetter )
                if ( ! new_ModificationCountEntry_FromMap ) {
                    new_ModificationCountEntry_FromMap = {
                        modifiedResidueLetter: residueLetter,
                        modificationCount: 0
                    }
                    newResult._modificationCount__YES_Localized_Modifications__Map_Key_ModifiedResidueLetter.set( residueLetter, new_ModificationCountEntry_FromMap )
                }

                new_ModificationCountEntry_FromMap.modificationCount += existing_ModificationCountEntry.modificationCount
            }

            for ( const existing_MapEntry of existingEntry._modificationCount__NOT_Localized_Unlocalized_Modifications__Map_Key_ModifiedResidueLetter.entries() ) {
                const residueLetter = existing_MapEntry[ 0 ]
                const existing_ModificationCountEntry = existing_MapEntry[ 1 ]

                let new_ModificationCountEntry_FromMap = newResult._modificationCount__NOT_Localized_Unlocalized_Modifications__Map_Key_ModifiedResidueLetter.get( residueLetter )
                if ( ! new_ModificationCountEntry_FromMap ) {
                    new_ModificationCountEntry_FromMap = {
                        modifiedResidueLetter: residueLetter,
                        modificationCount: 0
                    }
                    newResult._modificationCount__NOT_Localized_Unlocalized_Modifications__Map_Key_ModifiedResidueLetter.set( residueLetter, new_ModificationCountEntry_FromMap )
                }

                new_ModificationCountEntry_FromMap.modificationCount += existing_ModificationCountEntry.modificationCount
            }
        }

        return newResult
    }
}