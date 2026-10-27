/**
 * passwordTooLong_PageCheck.ts
 *
 * Password too long check on pages that SET a password (create account, admin create user, change password, reset password).
 *
 * NOT used for login.  Login never checks the password length.
 *
 * The max length is in UTF-8 bytes and comes from the server, put on the page in:
 *   <script type="text/text" id="password_max_length_utf8_bytes">
 *
 * The messages shown to the user are in characters, never bytes.
 */


const _PASSWORD_MAX_LENGTH_UTF8_BYTES_DOM_ID = "password_max_length_utf8_bytes";

/**
 * Shown when the server says the password is too long but the page computes that it is NOT too long.  Should not happen.
 */
const _PASSWORD_TOO_LONG_MESSAGE__FALLBACK = "Password is too long. Remove 5 characters and try again.";

/**
 * Max password length in UTF-8 bytes, read from the page.
 *
 * Throws if it is not on the page or is not a positive integer.
 */
export const passwordTooLong_PageCheck__Get_PasswordMaxLength_UTF8_Bytes_FromPage = function () : number {

    const domElement = document.getElementById( _PASSWORD_MAX_LENGTH_UTF8_BYTES_DOM_ID );
    if ( ! domElement ) {
        const msg = "No DOM element with id '" + _PASSWORD_MAX_LENGTH_UTF8_BYTES_DOM_ID + "'";
        console.warn( msg );
        throw Error( msg );
    }

    const valueString = domElement.textContent.trim();

    const value = Number.parseInt( valueString, 10 );

    if ( ( ! Number.isInteger( value ) ) || value <= 0 || String( value ) !== valueString ) {
        const msg = "DOM element with id '" + _PASSWORD_MAX_LENGTH_UTF8_BYTES_DOM_ID + "' does not contain a positive integer. contents: '" + valueString + "'";
        console.warn( msg );
        throw Error( msg );
    }

    return value;
}

/**
 * Number of characters (code points, so an emoji is 1) to remove from the END of the password
 * so that its UTF-8 byte length is at or under maxBytes.
 *
 * Returns 0 when the password is not too long.
 */
export const passwordTooLong_PageCheck__Compute_NumberOfCharactersToRemoveFromEnd = function (
    {
        password, maxBytes
    } : {
        password : string
        maxBytes : number
    }
) : number {

    const textEncoder = new TextEncoder();

    let byteLength = textEncoder.encode( password ).length;

    if ( byteLength <= maxBytes ) {
        return 0; // EARLY RETURN
    }

    const codePoints = Array.from( password );

    let numberOfCharactersToRemove = 0;

    while ( byteLength > maxBytes && codePoints.length > 0 ) {
        const removed = codePoints.pop();
        byteLength -= textEncoder.encode( removed ).length;
        numberOfCharactersToRemove++;
    }

    return numberOfCharactersToRemove;
}

/**
 * Message for the user, or null if the password is not too long.
 */
export const passwordTooLong_PageCheck__Get_Message_IfTooLong = function (
    {
        password, maxBytes
    } : {
        password : string
        maxBytes : number
    }
) : string {

    const numberOfCharactersToRemove = passwordTooLong_PageCheck__Compute_NumberOfCharactersToRemoveFromEnd({ password, maxBytes });

    if ( numberOfCharactersToRemove === 0 ) {
        return null;
    }

    return _get_Message_RemoveLastN( numberOfCharactersToRemove );
}

/**
 * Message for the user when the server returned passwordTooLong.
 *
 * Recomputes on the page.  If the page does NOT find it too long (should not happen), returns the fallback message.
 */
export const passwordTooLong_PageCheck__Get_Message_ServerSaidTooLong = function (
    {
        password, maxBytes
    } : {
        password : string
        maxBytes : number
    }
) : string {

    const message = passwordTooLong_PageCheck__Get_Message_IfTooLong({ password, maxBytes });

    if ( message ) {
        return message;
    }

    return _PASSWORD_TOO_LONG_MESSAGE__FALLBACK;
}

/**
 *
 */
const _get_Message_RemoveLastN = function ( numberOfCharactersToRemove : number ) : string {

    if ( numberOfCharactersToRemove === 1 ) {
        return "Password is too long. Remove the last 1 character and try again.";
    }

    return "Password is too long. Remove the last " + numberOfCharactersToRemove + " characters and try again.";
}
