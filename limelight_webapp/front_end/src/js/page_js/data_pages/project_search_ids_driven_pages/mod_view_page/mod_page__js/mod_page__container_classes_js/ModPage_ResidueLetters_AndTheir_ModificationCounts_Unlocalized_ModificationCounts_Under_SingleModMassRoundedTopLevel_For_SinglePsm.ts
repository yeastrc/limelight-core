/**
 * ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.ts
 */

/**
 * //  'ModificationCount' may be fractional for modifications with > 1 position or no positions
 */
export class ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm {

    readonly psmId: number

    readonly proteinSequenceVersionId__WhenForSpecificProtein: number

    private _modificationCount_YES_Localized_Modifications__Map_ModifiedResidueLetter: Map<string,
        {
            modificationCount: number
            modifiedResidueLetter: string
        }
    > = new Map()

    private _modificationCount_NOT_Localized_Unlocalized_Modifications__Map_ModifiedResidueLetter: Map<string,
        {
            modificationCount: number
            modifiedResidueLetter: string
        }
    > = new Map()

    constructor(
        {
            psmId, proteinSequenceVersionId__WhenForSpecificProtein
        } : {
            psmId: number
            proteinSequenceVersionId__WhenForSpecificProtein?: number
        }
    ) {
        this.psmId = psmId
        this.proteinSequenceVersionId__WhenForSpecificProtein = proteinSequenceVersionId__WhenForSpecificProtein
    }


    get_YES_Localized_Modifications__ModificationCount_ModifiedResidueLetter_Entries() {
        return this._modificationCount_YES_Localized_Modifications__Map_ModifiedResidueLetter.values()
    }

    get_NOT_Localized_Unlocalized__Modifications__ModificationCount_ModifiedResidueLetter_Entries() {
        return this._modificationCount_NOT_Localized_Unlocalized_Modifications__Map_ModifiedResidueLetter.values()
    }

    /**
     * Add Localized Modification
     *
     * @param modificationCountToAdd
     * @param modifiedResidueLetter
     */
    add_modificationCount__YES_Localized__For_ModifiedResidueLetter(
        {
            modificationCountToAdd, modifiedResidueLetter
        } : {
            modificationCountToAdd: number
            modifiedResidueLetter: string
        }
    ) {

        let entry_for_modifiedResidueLetter = this._modificationCount_YES_Localized_Modifications__Map_ModifiedResidueLetter.get( modifiedResidueLetter )
        if ( ! entry_for_modifiedResidueLetter ) {
            entry_for_modifiedResidueLetter = {
                modificationCount: 0, modifiedResidueLetter
            }
            this._modificationCount_YES_Localized_Modifications__Map_ModifiedResidueLetter.set( modifiedResidueLetter, entry_for_modifiedResidueLetter )
        }

        entry_for_modifiedResidueLetter.modificationCount += modificationCountToAdd
    }

    /**
     * Add NOT Localized (unlocalized) Modification
     *
     * @param modificationCountToAdd
     * @param modifiedResidueLetter
     */
    add_modificationCount__NOT_Localized_Unlocalized__For_ModifiedResidueLetter(
        {
            modificationCountToAdd, modifiedResidueLetter
        } : {
            modificationCountToAdd: number
            modifiedResidueLetter: string
        }
    ) {

        let entry_for_modifiedResidueLetter = this._modificationCount_NOT_Localized_Unlocalized_Modifications__Map_ModifiedResidueLetter.get( modifiedResidueLetter )
        if ( ! entry_for_modifiedResidueLetter ) {
            entry_for_modifiedResidueLetter = {
                modificationCount: 0, modifiedResidueLetter
            }
            this._modificationCount_NOT_Localized_Unlocalized_Modifications__Map_ModifiedResidueLetter.set( modifiedResidueLetter, entry_for_modifiedResidueLetter )
        }

        entry_for_modifiedResidueLetter.modificationCount += modificationCountToAdd
    }

    /**
     * Add values in passed in item to current object
     * @param item
     */
    add_From( item: ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm ) {

        if ( this.psmId !== item.psmId ) {
            const msg = "add_From( item ): ( this.psmId !== item.psmId ) : this.psmId: " + this.psmId + ", item.psmId: " + item.psmId
            console.warn(msg)
            throw Error(msg)
        }

        for ( const addFrom_Entry of item._modificationCount_YES_Localized_Modifications__Map_ModifiedResidueLetter.values() ) {

            let entry_for_modifiedResidueLetter = this._modificationCount_YES_Localized_Modifications__Map_ModifiedResidueLetter.get( addFrom_Entry.modifiedResidueLetter )
            if ( ! entry_for_modifiedResidueLetter ) {
                entry_for_modifiedResidueLetter = {
                    modificationCount: 0, modifiedResidueLetter: addFrom_Entry.modifiedResidueLetter
                }
                this._modificationCount_YES_Localized_Modifications__Map_ModifiedResidueLetter.set( addFrom_Entry.modifiedResidueLetter, entry_for_modifiedResidueLetter )
            }

            // if ( entry_for_modifiedResidueLetter.modificationCount > 0 ) {
            //     //  Count is already > 0
            //     var z = 0
            // }

            entry_for_modifiedResidueLetter.modificationCount += addFrom_Entry.modificationCount
        }

        for ( const addFrom_Entry of item._modificationCount_NOT_Localized_Unlocalized_Modifications__Map_ModifiedResidueLetter.values() ) {

            let entry_for_modifiedResidueLetter = this._modificationCount_NOT_Localized_Unlocalized_Modifications__Map_ModifiedResidueLetter.get( addFrom_Entry.modifiedResidueLetter )
            if ( ! entry_for_modifiedResidueLetter ) {
                entry_for_modifiedResidueLetter = {
                    modificationCount: 0, modifiedResidueLetter: addFrom_Entry.modifiedResidueLetter
                }
                this._modificationCount_NOT_Localized_Unlocalized_Modifications__Map_ModifiedResidueLetter.set( addFrom_Entry.modifiedResidueLetter, entry_for_modifiedResidueLetter )
            }

            // if ( entry_for_modifiedResidueLetter.modificationCount > 0 ) {
            //     //  Count is already > 0
            //     var z = 0
            // }

            entry_for_modifiedResidueLetter.modificationCount += addFrom_Entry.modificationCount
        }
    }
}