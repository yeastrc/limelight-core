/**
 * webserviceCallStandardPost_LimitToOne_ConcurrentRequest_SessionStorage.ts
 *
 *  Flag in browser Session Storage: Limit webserviceCallStandardPost to ONE concurrent webservice call.
 *
 *  Set when a webservice call fails in a way that suggests the browser/network cannot handle the concurrent calls:
 *      - fetch() rejects (Network error. Same as HTTP Status Code 0 in jQuery/XMLHttpRequest)
 *      - HTTP Status Code 0
 *      - HTTP Status Code 200 (response.ok) AND reading the response body failed
 *
 *  Session Storage is per browser tab so ALL Limelight pages later loaded in that tab will limit to ONE concurrent webservice call.
 *  Cleared when the tab is closed.
 */


const _SESSION_STORAGE_KEY__limelight_webservice_call_limit_to_one_concurrent_request = "limelight_webservice_call_limit_to_one_concurrent_request"

/**
 *  true after 'pagehide' event.  The browser cancels in progress fetch() calls when the page is unloaded,
 *  which can look like a network error, so do NOT set the flag while the page is being unloaded.
 */
let _pageIsHidden_Unloading = false

window.addEventListener( "pagehide", () => {
    _pageIsHidden_Unloading = true
} )
window.addEventListener( "pageshow", () => {
    _pageIsHidden_Unloading = false  // Page restored from Back/Forward Cache
} )

/**
 * @returns true if flag is set in Session Storage
 */
export const webserviceCallStandardPost_LimitToOne_ConcurrentRequest_SessionStorage__get_LimitToOne_ConcurrentRequest = function () : boolean {

    try {
        const storedValueJSON = window.sessionStorage.getItem( _SESSION_STORAGE_KEY__limelight_webservice_call_limit_to_one_concurrent_request )
        if ( ! storedValueJSON ) {
            return false
        }

        const storageValue: Internal__Root__SessionStorageObject = JSON.parse( storedValueJSON );
        if ( storageValue && storageValue.limitToOne_ConcurrentRequest ) {
            return true
        }
    } catch ( e ) {
        //  Session Storage not available or stored value not valid JSON.  Treat as not set.
    }

    return false
}

/**
 * Set flag in Session Storage.
 *
 * @returns true if flag was set.  false if page is being unloaded (flag NOT set)
 */
export const webserviceCallStandardPost_LimitToOne_ConcurrentRequest_SessionStorage__set_LimitToOne_ConcurrentRequest = function ( { reason_ForLog } : { reason_ForLog: string } ) : boolean {

    if ( _pageIsHidden_Unloading ) {
        //  Failure is likely from browser cancelling fetch() since page is being unloaded so do NOT set the flag
        return false
    }

    console.warn( "Limiting webservice calls to ONE concurrent call for all Limelight pages loaded in this browser tab. Reason: " + reason_ForLog )

    try {
        const storageValue: Internal__Root__SessionStorageObject = {
            limitToOne_ConcurrentRequest: true
        }
        const storedValueJSON = JSON.stringify( storageValue );

        window.sessionStorage.setItem( _SESSION_STORAGE_KEY__limelight_webservice_call_limit_to_one_concurrent_request, storedValueJSON )
    } catch ( e ) {
        //  Session Storage not available.  Caller still limits the current page.
        console.warn( "Failed to save flag to Session Storage to limit webservice calls to ONE concurrent call. ", e )
    }

    return true
}


interface Internal__Root__SessionStorageObject {
    limitToOne_ConcurrentRequest: boolean
}
