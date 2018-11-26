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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main;

import org.springframework.stereotype.Component;

/**
 * Internal Package Private Code
 * 
 * Format the returned Search Data Lookup Params Code.
 *
 */
@Component
class SearchDataLookupParams_FormatParseCodeString {

	private static final String SEPARATOR = "z"; // can use since  since strings are hex string and base 10 string.
	
	private static final String OLD_SEPARATOR = "_";

	/**
	 * @param hashOfParamsMD5Hex
	 * @param hashCollisionIndex
	 * @return
	 */
	String formatCodeString( String hashOfParamsMD5Hex, int hashCollisionIndex ) {
		
		String code = hashOfParamsMD5Hex + SEPARATOR + Integer.toString( hashCollisionIndex );
		return code;
	}
	
	
	/**
	 * 
	 *
	 */
	static class SearchDataLookupParams_FormatParseCodeString_ParseResult {
		
		private String hashOfParamsMD5Hex;
		private int hashCollisionIndex;
		
		public int getHashCollisionIndex() {
			return hashCollisionIndex;
		}
		public void setHashCollisionIndex(int hashCollisionIndex) {
			this.hashCollisionIndex = hashCollisionIndex;
		}
		public String getHashOfParamsMD5Hex() {
			return hashOfParamsMD5Hex;
		}
		public void setHashOfParamsMD5Hex(String hashOfParamsMD5Hex) {
			this.hashOfParamsMD5Hex = hashOfParamsMD5Hex;
		}
	}

	/**
	 * @param hashOfParamsMD5Hex
	 * @param hashCollisionIndex
	 * @return
	 */
	SearchDataLookupParams_FormatParseCodeString_ParseResult parseCodeString( String codeString ) {
		
		if ( codeString == null || codeString.length() == 0 ) {
			throw new IllegalArgumentException( "codeString is null or empty" );
		}
		
		String[] codeStringSplit = codeString.split( SEPARATOR );

		if ( codeStringSplit.length != 2 ) {
			
			codeStringSplit = codeString.split( OLD_SEPARATOR ); // Try split on old separator
			
			if ( codeStringSplit.length != 2 ) {
				throw new IllegalArgumentException( "codeString is incorrect format.  Not delimited by: " + SEPARATOR );
			}
		}
		
		SearchDataLookupParams_FormatParseCodeString_ParseResult result = new SearchDataLookupParams_FormatParseCodeString_ParseResult();
		
		result.hashOfParamsMD5Hex = codeStringSplit[ 0 ];
		
		String hashCollisionIndexString = codeStringSplit[ 1 ];
		if ( hashCollisionIndexString.length() == 0 ) {
			throw new IllegalArgumentException( "codeString is incorrect format.  No characters after delimiter: " + SEPARATOR );
		}
		try {
			result.hashCollisionIndex = Integer.parseInt( hashCollisionIndexString );
		} catch ( Exception e ) {
			throw new IllegalArgumentException( 
					"codeString is incorrect format.  Characters after delimiter '" + SEPARATOR
					+ "' not an integer: " + hashCollisionIndexString );
		}
		
		return result;
	}
	
}
