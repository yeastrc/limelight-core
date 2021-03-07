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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * Unmarshal Rest Request JSON ToObject
 *
 */
@Component
public class Unmarshal_RestRequest_JSON_ToObject {

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;
	
	/**
	 * @param bytesJSON
	 * @param valueType
	 * @return
	 * @throws Limelight_WS_BadRequest_InvalidParameter_Exception - when unmarshal fails
	 */
	public <T> T getObjectFromJSONByteArray( byte[] bytesJSON, Class<T> valueType ) throws Limelight_WS_BadRequest_InvalidParameter_Exception {
		
		try {
			return unmarshalJSON_ToObject.getObjectFromJSONByteArray( bytesJSON, valueType );
		} catch ( Exception e ) {
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
	}
}
