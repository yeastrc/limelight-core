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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.general;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;

/**
 * Log Browser Javascript Error Webservice
 *
 */
@RestController
public class LogBrowserJavascriptError_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( LogBrowserJavascriptError_RestWebserviceController.class );

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private UserSessionManager userSessionManager;
	
	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	

	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.LOG_BROWSER_JAVASCRIPT_ERROR_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
   	
    	try {
    		LogBrowserJavascriptErrorsRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, LogBrowserJavascriptErrorsRequest.class );

    		if ( ! webserviceRequest.fdajklweRWOIUOPOP ) {
    			
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		String usernameForLogMsg = "\n No User Session or No Username in Session";
    		
    		String userIdForLogMsg = "\n No User Session or No User Id in Session";
    		
    		UserSession userSession = userSessionManager.getUserSession( httpServletRequest );
    		if ( userSession != null ) {
    			String username = userSession.getUsername();
    			if ( username != null ) {
    				usernameForLogMsg = "\n username in session: " + username;
    			}
    			Integer userId = userSession.getUserId();
    			if ( userId != null ) {
    				userIdForLogMsg = "\n userId in session: " + userId;
    			}
    		}
    		
    		log.error( "Error encountered on browser: message: " + webserviceRequest.errorMsg
    				+ "\n stack: " + webserviceRequest.stackString
    				+ "\n userAgent: " + webserviceRequest.userAgent
    				+ "\n browserURL: " + webserviceRequest.browserURL
    				+ "\n Remote IP: " + httpServletRequest.getRemoteAddr()
    				+ usernameForLogMsg
    				+ userIdForLogMsg );
    		

    		try {
    			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
    			
    		} catch ( Exception e ) {
    			
    			log.error( "Exception calling sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();", e );
    			
    			//  Swallow Exception
    		}
			
    		LogBrowserJavascriptErrorResult webserviceResult = new LogBrowserJavascriptErrorResult();
    		webserviceResult.status = true;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    

	public static class LogBrowserJavascriptErrorsRequest {
		
		private String errorMsg;
		private String stackString;
		private String userAgent;
		private String browserURL;
		private boolean fdajklweRWOIUOPOP;
		
		
		public String getErrorMsg() {
			return errorMsg;
		}
		public void setErrorMsg(String errorMsg) {
			this.errorMsg = errorMsg;
		}
		public String getStackString() {
			return stackString;
		}
		public void setStackString(String stackString) {
			this.stackString = stackString;
		}
		public boolean isFdajklweRWOIUOPOP() {
			return fdajklweRWOIUOPOP;
		}
		public void setFdajklweRWOIUOPOP(boolean fdajklweRWOIUOPOP) {
			this.fdajklweRWOIUOPOP = fdajklweRWOIUOPOP;
		}
		public String getUserAgent() {
			return userAgent;
		}
		public void setUserAgent(String userAgent) {
			this.userAgent = userAgent;
		}
		public String getBrowserURL() {
			return browserURL;
		}
		public void setBrowserURL(String browserURL) {
			this.browserURL = browserURL;
		}
	}

	public static class LogBrowserJavascriptErrorResult {
		
		private boolean status;

		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
	}
}
