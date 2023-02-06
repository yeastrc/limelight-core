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

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.json_marshal_unmarshal_interfaces.Limelight_SharedCode__JSON_UnMarshal_CommonInterface;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Unmarshal object from JSON
 *
 */
@Component
public class UnmarshalJSON_ToObject implements Limelight_SharedCode__JSON_UnMarshal_CommonInterface {

	private static final Logger log = LoggerFactory.getLogger( UnmarshalJSON_ToObject.class );
	
	/**
	 * @param resultsObject
	 * @param searchId
	 * @return
	 * @throws IOException
	 */
	public <T> T getObjectFromJSONByteArray( byte[] bytesJSON, Class<T> valueType ) throws Exception {
		
		if ( bytesJSON == null ) {
			throw new IllegalArgumentException( "param cannot be null" );
		}

		//  Jackson JSON Mapper object for JSON deserialization and serialization
		ObjectMapper jacksonJSON_Mapper = new ObjectMapper();  //  Jackson JSON library object

		T parsedJSONAsObject = null;
		try {
			parsedJSONAsObject = jacksonJSON_Mapper.readValue( bytesJSON, valueType );
		} catch ( Exception e ) {
			String bytesJSONAsString = "Failed to convert bytes to String";
			try {
				bytesJSONAsString = new String( bytesJSON, StandardCharsets.UTF_8 );
			} catch ( Exception e_BytesToString ) {
				String msg = "Failed to convert bytes to String";
				log.error( msg, e_BytesToString );
			}
			
			String msg = "Failed to parse 'bytesJSON', Exception.  bytesJSON: " + bytesJSONAsString; 
			log.error( msg, e );
			throw e;
		}
		
		return parsedJSONAsObject;
	}

	/**
	 * @param resultsObject
	 * @param searchId
	 * @return
	 * @throws IOException
	 */
	public <T> T getObjectFromJSONString( String stringJSON, Class<T> valueType ) throws Exception {
		
		if ( stringJSON == null ) {
			throw new IllegalArgumentException( "param cannot be null" );
		}

		//  Jackson JSON Mapper object for JSON deserialization and serialization
		ObjectMapper jacksonJSON_Mapper = new ObjectMapper();  //  Jackson JSON library object

		T parsedJSONAsObject = null;
		try {
			parsedJSONAsObject = jacksonJSON_Mapper.readValue( stringJSON, valueType );
		} catch ( Exception e ) {
			String msg = "Failed to parse 'stringJSON', Exception.  stringJSON: " + stringJSON; 
			log.error( msg, e );
			throw e;
		}
		
		return parsedJSONAsObject;
	}
	
}
