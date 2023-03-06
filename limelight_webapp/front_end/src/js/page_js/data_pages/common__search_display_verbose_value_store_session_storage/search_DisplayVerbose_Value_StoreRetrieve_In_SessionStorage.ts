/**
 * search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.ts
 *
 *  Search "Verbose:" checkbox value store/retrieve to browser Session Storage
 *
 */


const _SESSION_STORAGE_KEY__limelight_search_display_verbose_value = "limelight_search_display_verbose_value"

/**
 *
 */
export class Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage {

    /**
     *
     */
    static get_Value() : boolean {

        let verbose = true // default to true

        const storedValueJSON = window.sessionStorage.getItem(_SESSION_STORAGE_KEY__limelight_search_display_verbose_value )
        if ( ! storedValueJSON ) {


        } else {

            let storageValue: Internal__Root__SessionStorageObject = null
            try {
                storageValue = JSON.parse( storedValueJSON );
            } catch (e) {

            }
            if ( storageValue ) {
                verbose = storageValue.verbose;
            }
        }

        return verbose
    }

    /**
     *
     * @param verbose
     */
    static save_Value( verbose: boolean ) {

        const fcn = () => {

            const storageValue: Internal__Root__SessionStorageObject = {
                verbose
            }
            const storedValueJSON = JSON.stringify( storageValue );

            window.sessionStorage.setItem(_SESSION_STORAGE_KEY__limelight_search_display_verbose_value, storedValueJSON )
        }

        window.setTimeout(  fcn, 50 );
    }

}


interface Internal__Root__SessionStorageObject {
    verbose: boolean
}
