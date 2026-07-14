/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * Encode / Decode a String to/from a Base64 String that is safe to put in an HTTP header value.
 *
 * HTTP header values are transported as ISO-8859-1 (Latin-1) bytes, so a String containing any
 * character outside that range (e.g. non-Latin text, emoji, "smart" quotes) cannot be sent as a
 * raw header value.  Encoding the String as Base64 of its UTF-8 bytes yields a pure-ASCII value
 * that always round-trips.
 *
 * Keep in sync with the front end:
 *   front_end/.../page_js/data_pages/data_pages_common/httpHeaderValue_Base64_EncodeDecode.ts
 *
 * Standard Base64 alphabet ( '+' '/' '=' ) is used.  Those characters are all valid in an HTTP
 * header value, and match what the browser's btoa(...) produces, so no URL-safe variant is needed.
 */
public class HttpHeaderValue_Base64_Encoding {

	/**
	 * @param inputString  String to encode.  Must not be null.
	 * @return Base64 (of the UTF-8 bytes of inputString) - safe to place in an HTTP header value.
	 */
	public static String encode_String_To_HttpHeaderValue_Base64( String inputString ) {

		if ( inputString == null ) {
			throw new IllegalArgumentException( "inputString cannot be null" );
		}

		byte[] utf8Bytes = inputString.getBytes( StandardCharsets.UTF_8 );

		return Base64.getEncoder().encodeToString( utf8Bytes );
	}

	/**
	 * @param base64HeaderValue  Base64 value read from an HTTP header (as produced by
	 *                           encode_String_To_HttpHeaderValue_Base64(...) or the front end).
	 *                           Must not be null.
	 * @return The decoded String.
	 */
	public static String decode_HttpHeaderValue_Base64_ToString( String base64HeaderValue ) {

		if ( base64HeaderValue == null ) {
			throw new IllegalArgumentException( "base64HeaderValue cannot be null" );
		}

		byte[] utf8Bytes = Base64.getDecoder().decode( base64HeaderValue );

		return new String( utf8Bytes, StandardCharsets.UTF_8 );
	}
}
