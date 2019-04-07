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

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_WebserviceSyncTrackingCodeMismatch_Exception;

/**
 * Validate the webserviceSyncTracking code in web service calls
 * 
 * Assumes only 1 instance of webapp running or using sticky session if load balanced.
 * 
 * Currently using Servlet session for session management. The requirements also apply to Servlet Session. 
 *
 */
@Component
public class Validate_WebserviceSyncTracking_Code implements Validate_WebserviceSyncTracking_CodeIF {
	

	/**
	 * String "limelight_webservice_sync_tracking_code" must be kept in sync with Javascript code on page
	 * 
	 * See LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM in file EveryPageCommon.js
	 */
	private static final String WEBSERVICE_REQUEST_HEADER_KEY = "limelight_webservice_sync_tracking_code";
	
	/**
	 * Set on webapp startup, class WebappServletContextListener
	 */
	private static String webserviceSyncTracking_Code_OnServer;

	/**
	 * Validate the webserviceSyncTracking code in web service calls
	 * 
	 * If mismatch, throws exception Limelight_WS_BadRequest_WebserviceSyncTrackingCodeMismatch_Exception
	 *   so Javascript code reloads the page to get the latest tracking code and the latest web page and latest Javscript code.
	 *   
	 * @param httpServletRequest
	 */
	@Override
	public void validate_webserviceSyncTracking_Code( HttpServletRequest httpServletRequest ) {
		
		String limelight_webservice_sync_tracking_code = httpServletRequest.getHeader( WEBSERVICE_REQUEST_HEADER_KEY );
		
		if ( StringUtils.isEmpty( limelight_webservice_sync_tracking_code) ) {
			//  No Value so exit
			return; // EARLY EXIT
		}

		if ( ! webserviceSyncTracking_Code_OnServer.equals( limelight_webservice_sync_tracking_code ) ) {
			
			//  String in webserviceSyncTracking_Code_OnServer is placed on HTML of page in JSP
			//  The Javascript code on the page passes that value in the header
			
			//  If the 2 values don't match, throw the following exception. 
			//  The Javascript code checks for that status code and text 
			//    and if found the page is reloaded to get the latest tracking code.
			
			throw new Limelight_WS_BadRequest_WebserviceSyncTrackingCodeMismatch_Exception();
		}
		
	}

	/* 
	 * Set on webapp startup
	 */
	public static void setWebserviceSyncTracking_Code_OnServer(String webserviceSyncTracking_Code_OnServer) {
		Validate_WebserviceSyncTracking_Code.webserviceSyncTracking_Code_OnServer = webserviceSyncTracking_Code_OnServer;
	}

}
