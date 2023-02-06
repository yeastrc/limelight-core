package org.yeastrc.limelight.limelight_feature_detection_run_import.utils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.json_marshal_unmarshal_interfaces.Limelight_SharedCode__JSON_UnMarshal_CommonInterface;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 *
 */
public class UnmarshalJSON_ToObject implements Limelight_SharedCode__JSON_UnMarshal_CommonInterface {

	private static final Logger log = LoggerFactory.getLogger( UnmarshalJSON_ToObject.class );

	private UnmarshalJSON_ToObject() { }
	public static UnmarshalJSON_ToObject getInstance() { return new UnmarshalJSON_ToObject(); }
	
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
