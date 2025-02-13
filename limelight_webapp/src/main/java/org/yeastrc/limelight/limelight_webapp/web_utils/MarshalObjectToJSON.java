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

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Marshal object to JSON
 *
 */
@Component
public class MarshalObjectToJSON {

	private static final Logger log = LoggerFactory.getLogger( MarshalObjectToJSON.class );
	

	/**
	 * @param object
	 * @return
	 * @throws IOException
	 */
	public byte[] getJSONByteArray( Object object ) throws IOException {
		
		return getJSONByteArray_Internal( object, NotReturn_ObjectField_ThatIs_Null.NO );
	}


	/**
	 * Any object fields that are null will not be serialized
	 * 
	 * Only use for new code where check the processing on the receiving end that is looking for 'null'.
	 *     In Typescript/Javascript check for 'undefined' since the property is not serialized to JSON 
	 * 
	 * @param object
	 * @return
	 * @throws IOException
	 */
	public byte[] getJSONByteArray_NotReturn_ObjectField_ThatIs_Null( Object object ) throws IOException {
		
		return getJSONByteArray_Internal( object, NotReturn_ObjectField_ThatIs_Null.YES );
	}
	
	private enum NotReturn_ObjectField_ThatIs_Null { NO, YES }
	
	/**
	 * @param object
	 * @return
	 * @throws IOException
	 */
	private byte[] getJSONByteArray_Internal( Object object, NotReturn_ObjectField_ThatIs_Null notReturn_ObjectField_ThatIs_Null ) throws IOException {
		
		if ( object == null ) {
			throw new IllegalArgumentException( "param cannot be null" );
		}
		
		ByteArrayOutputStream baos = new ByteArrayOutputStream( );

		//  Jackson JSON Mapper object for JSON deserialization and serialization
		ObjectMapper jacksonJSON_Mapper = new ObjectMapper();
		
		//  Only use for new code where check the processing on the receiving end that is looking for 'null'.
		//	  In Typescript/Javascript check for 'undefined' since the property is not serialized to JSON
		
		//        Some existing JS code only checks for 'null' and not also 'undefined'
		
		if ( notReturn_ObjectField_ThatIs_Null == NotReturn_ObjectField_ThatIs_Null.YES ) {

			//  NOT send any object field that is null
			
			jacksonJSON_Mapper.setSerializationInclusion(com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL);
		}
		
		//   serialize 
		try {
			jacksonJSON_Mapper.writeValue( baos, object );
		} catch ( JsonParseException e ) {
			String msg = "Failed to serialize 'resultsObject', JsonParseException. class of param: " + object.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( JsonMappingException e ) {
			String msg = "Failed to serialize 'resultsObject', JsonMappingException. class of param: " + object.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( IOException e ) {
			String msg = "Failed to serialize 'resultsObject', IOException. class of param: " + object.getClass() ;
			log.error( msg, e );
			throw e;
		}
		
		return baos.toByteArray();
	}
	
	/**
	 * @param searchDataLookupParamsRoot
	 * @return
	 * @throws Exception
	 */
	public String getJSONString( Object object ) throws Exception {

		//  Jackson JSON Mapper object for JSON deserialization and serialization
		ObjectMapper jacksonJSON_Mapper = new ObjectMapper();
		//   serialize 
		try {
			return jacksonJSON_Mapper.writeValueAsString( object );
		} catch ( JsonParseException e ) {
			String msg = "Failed to serialize 'object', JsonParseException. class of param: " + object.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( JsonMappingException e ) {
			String msg = "Failed to serialize 'object', JsonMappingException. class of param: " + object.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( IOException e ) {
			String msg = "Failed to serialize 'object', IOException. class of param: " + object.getClass() ;
			log.error( msg, e );
			throw e;
		}
	}
	
}
