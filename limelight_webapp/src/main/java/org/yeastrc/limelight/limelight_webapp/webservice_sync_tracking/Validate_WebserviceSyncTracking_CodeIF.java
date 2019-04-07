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
package org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking;

import javax.servlet.http.HttpServletRequest;

/**
 * @author danj
 *
 */
public interface Validate_WebserviceSyncTracking_CodeIF {

	/**
	 * Validate the webserviceSyncTracking code in web service calls
	 * 
	 * If mismatch, throws exception Limelight_WS_BadRequest_WebserviceSyncTrackingCodeMismatch_Exception
	 *   so Javascript code reloads the page to get the latest tracking code and the latest web page and latest Javscript code.
	 *   
	 * @param httpServletRequest
	 */
	void validate_webserviceSyncTracking_Code(HttpServletRequest httpServletRequest);

}