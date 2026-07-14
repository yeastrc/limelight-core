/**
 * httpHeaderValue_Base64_EncodeDecode.ts
 *
 * Encode / Decode a string to/from a Base64 string that is safe to put in an HTTP header value.
 *
 * HTTP header values are transported as ISO-8859-1 (Latin-1) bytes, so a string containing any
 * character outside that range (e.g. non-Latin text, emoji, "smart" quotes) cannot be sent as a
 * raw header value -- fetch(...) / XMLHttpRequest.setRequestHeader(...) throw when it is attempted.
 * Encoding the string as Base64 of its UTF-8 bytes yields a pure-ASCII value that always round-trips.
 *
 * Keep in sync with the server side:
 *   limelight_webapp/src/main/java/org/yeastrc/limelight/limelight_webapp/web_utils/HttpHeaderValue_Base64_Encoding.java
 *
 * Standard Base64 alphabet ( '+' '/' '=' ), as produced by btoa(...), which Java's
 * Base64.getDecoder() reads.  All of those characters are valid in an HTTP header value.
 */

"use strict";

//  Encode/decode in chunks so String.fromCharCode.apply(...) is not called with a huge argument list
const _BINARY_STRING_CHUNK_SIZE = 0x8000; // 32768

/**
 * @param inputString - string to encode
 * @return Base64 (of the UTF-8 bytes of inputString) - safe to place in an HTTP header value
 */
export function encode_String_To_HttpHeaderValue_Base64( inputString: string ): string {

    const utf8Bytes: Uint8Array = new TextEncoder().encode( inputString );

    let binaryString = "";
    for ( let index = 0; index < utf8Bytes.length; index += _BINARY_STRING_CHUNK_SIZE ) {
        const chunk = utf8Bytes.subarray( index, index + _BINARY_STRING_CHUNK_SIZE );
        binaryString += String.fromCharCode.apply( null, chunk as unknown as number[] );
    }

    return btoa( binaryString );
}

/**
 * @param base64HeaderValue - Base64 value (as produced by encode_String_To_HttpHeaderValue_Base64(...)
 *                            or the server side) read from an HTTP header
 * @return the decoded string
 */
export function decode_HttpHeaderValue_Base64_To_String( base64HeaderValue: string ): string {

    const binaryString: string = atob( base64HeaderValue );

    const utf8Bytes: Uint8Array = new Uint8Array( binaryString.length );
    for ( let index = 0; index < binaryString.length; index++ ) {
        utf8Bytes[ index ] = binaryString.charCodeAt( index );
    }

    return new TextDecoder().decode( utf8Bytes );
}
