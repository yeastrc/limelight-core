/**
 * limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function.ts
 */

let limelight_base_href_value_String_DOM_NOT_FOUND = false


const _NOT_SET: string = undefined

let limelight_base_href_value_String: string = _NOT_SET



/**
 *
 */
export class Limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function_Exception_Class {

    /**
     *
     */
    constructor() {

    }

}

/**
 *
 * @param newURL
 */
export const limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function = function (
    {
        newURL
    } : {
        newURL : string
    } ) {


    window.history.replaceState( null, null, newURL );

    if ( limelight_base_href_value_String_DOM_NOT_FOUND ) {
        //  Previously not found so just exit

        return  // EARLY RETURN
    }

    {
        if ( limelight_base_href_value_String === _NOT_SET ) {

            const limelight_base_href_value_DOM_Element = document.getElementById( "limelight_base_href_value" )
            if ( ! limelight_base_href_value_DOM_Element ) {

                limelight_base_href_value_String_DOM_NOT_FOUND = true

                console.warn( "Failed to find DOM element with id 'limelight_base_href_value'" )

                return  // EARLY RETURN
            }

            limelight_base_href_value_String = limelight_base_href_value_DOM_Element.innerText

            if ( ! limelight_base_href_value_String ) {

                limelight_base_href_value_String_DOM_NOT_FOUND = true

                console.warn( "DOM element with id 'limelight_base_href_value' does NOT have a truthy value.  value: " + limelight_base_href_value_String )

                return  // EARLY RETURN
            }
        }

        const new_Browser_location_pathname = window.location.pathname

        if ( new_Browser_location_pathname.startsWith( limelight_base_href_value_String ) ) {

            const new_Browser_location_pathname_AFTER_baseRef = new_Browser_location_pathname.substring( limelight_base_href_value_String.length )

            if ( new_Browser_location_pathname_AFTER_baseRef !== newURL ) {

                const msg = "After call window.history.replaceState( null, null, newURL );  window.location.pathname after Limelight Base Ref NOT Equal newURL. newURL: '" + newURL + "', window.location.pathname after Limelight Base Ref: '" + new_Browser_location_pathname_AFTER_baseRef + "'"
                console.warn( msg )
                throw new Limelight__ReplaceBrowserAddressBarURL_ValidateUpdated_Function_Exception_Class()
            }
        }
    }
}
