/**
 * ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm.ts
 */

/**
 * //  'ModificationCount' may be fractional for modifications with > 1 position or no positions
 */
export class ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_Under_SingleModMassRoundedTopLevel_For_SinglePsm {

    readonly psmId: number

    readonly proteinSequenceVersionId__WhenForSpecificProtein: number

    private _modificationCount__Map_ModifiedResidueLetter: Map<string,
        {
            modificationCount: number
            modifiedResidueLetter: string
        }
    > = new Map()

    private _unlocalized_ModificationCount: number = 0

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


    get__ModificationCount_ModifiedResidueLetter_Entries() {
        return this._modificationCount__Map_ModifiedResidueLetter.values()
    }

    add_modificationCount__For_ModifiedResidueLetter(
        {
            modificationCountToAdd, modifiedResidueLetter
        } : {
            modificationCountToAdd: number
            modifiedResidueLetter: string
        }
    ) {

        let entry_for_modifiedResidueLetter = this._modificationCount__Map_ModifiedResidueLetter.get( modifiedResidueLetter )
        if ( ! entry_for_modifiedResidueLetter ) {
            entry_for_modifiedResidueLetter = {
                modificationCount: 0, modifiedResidueLetter
            }
            this._modificationCount__Map_ModifiedResidueLetter.set( modifiedResidueLetter, entry_for_modifiedResidueLetter )
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

        for ( const addFrom_Entry of item._modificationCount__Map_ModifiedResidueLetter.values() ) {

            let entry_for_modifiedResidueLetter = this._modificationCount__Map_ModifiedResidueLetter.get( addFrom_Entry.modifiedResidueLetter )
            if ( ! entry_for_modifiedResidueLetter ) {
                entry_for_modifiedResidueLetter = {
                    modificationCount: 0, modifiedResidueLetter: addFrom_Entry.modifiedResidueLetter
                }
                this._modificationCount__Map_ModifiedResidueLetter.set( addFrom_Entry.modifiedResidueLetter, entry_for_modifiedResidueLetter )
            }

            // if ( entry_for_modifiedResidueLetter.modificationCount > 0 ) {
            //     //  Count is already > 0
            //     var z = 0
            // }

            entry_for_modifiedResidueLetter.modificationCount += addFrom_Entry.modificationCount
        }

        this._unlocalized_ModificationCount += item._unlocalized_ModificationCount
    }
}