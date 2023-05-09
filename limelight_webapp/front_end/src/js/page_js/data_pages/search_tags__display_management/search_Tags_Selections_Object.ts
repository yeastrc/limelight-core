/**
 * search_Tags_Selections_Object.ts
 *
 * Search Tags Selections Object
 *
 *
 */


export class Search_Tags_Selections_Object {

    //  Values can be undefined or null
    readonly searchTagIdsSelected_Boolean__OR: ReadonlySet<number>
    readonly searchTagIdsSelected_Boolean__AND: ReadonlySet<number>
    readonly searchTagIdsSelected_Boolean__NOT: ReadonlySet<number>

    static createEmptyInstance() {

        return new Search_Tags_Selections_Object({
            searchTagIdsSelected_Boolean__OR: new Set(),
            searchTagIdsSelected_Boolean__AND: new Set(),
            searchTagIdsSelected_Boolean__NOT: new Set()
        })
    }

    /**
     * All params MUST be populated
     *
     * @param searchTagIdsSelected_Boolean__OR
     * @param searchTagIdsSelected_Boolean__AND
     * @param searchTagIdsSelected_Boolean__NOT
     */
    constructor(
        {
            searchTagIdsSelected_Boolean__OR,
            searchTagIdsSelected_Boolean__AND,
            searchTagIdsSelected_Boolean__NOT
        } : {
            readonly searchTagIdsSelected_Boolean__OR: ReadonlySet<number>
            readonly searchTagIdsSelected_Boolean__AND: ReadonlySet<number>
            readonly searchTagIdsSelected_Boolean__NOT: ReadonlySet<number>
        }) {
        if ( ( ! searchTagIdsSelected_Boolean__OR ) || ( ! searchTagIdsSelected_Boolean__AND ) || ( ! searchTagIdsSelected_Boolean__NOT ) ) {
            throw Error("Invalid params:  ( ( ! searchTagIdsSelected_Boolean__OR ) || ( ! searchTagIdsSelected_Boolean__AND ) || ( ! searchTagIdsSelected_Boolean__NOT ) )")
        }

        this.searchTagIdsSelected_Boolean__OR = searchTagIdsSelected_Boolean__OR
        this.searchTagIdsSelected_Boolean__AND = searchTagIdsSelected_Boolean__AND
        this.searchTagIdsSelected_Boolean__NOT = searchTagIdsSelected_Boolean__NOT
    }

    /**
     *
     */
    clone() {
        const clone = new Search_Tags_Selections_Object({
            searchTagIdsSelected_Boolean__OR: new Set( this.searchTagIdsSelected_Boolean__OR ),
            searchTagIdsSelected_Boolean__AND: new Set( this.searchTagIdsSelected_Boolean__AND ),
            searchTagIdsSelected_Boolean__NOT: new Set( this.searchTagIdsSelected_Boolean__NOT )
        })

        return clone;
    }

    /**
     *
     */
    is_any_selections() {

        if ( this.searchTagIdsSelected_Boolean__OR && this.searchTagIdsSelected_Boolean__OR.size > 0 ) {
            return true;
        }
        if ( this.searchTagIdsSelected_Boolean__AND && this.searchTagIdsSelected_Boolean__AND.size > 0 ) {
            return true;
        }
        if ( this.searchTagIdsSelected_Boolean__NOT && this.searchTagIdsSelected_Boolean__NOT.size > 0 ) {
            return true;
        }
        return false
    }
}