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
package org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.yeastrc.limelight.limelight_webapp.constants.WebServiceErrorMessageConstants;

/**
 * Webservice Error Response
 * 
 * Thrown for User is Forbidden (Not Authorized) to access this webservice
 * 
 * Used by Spring to generate a HTTP response to the caller
 *
 */
@ResponseStatus( 
		value = org.springframework.http.HttpStatus.FORBIDDEN, 
		reason = WebServiceErrorMessageConstants.FORBIDDEN_TEXT )

public class Limelight_WS_AuthError_Forbidden_Exception extends Limelight_WS_ErrorResponse_Base_Exception {

	private static final long serialVersionUID = 1L;

}
