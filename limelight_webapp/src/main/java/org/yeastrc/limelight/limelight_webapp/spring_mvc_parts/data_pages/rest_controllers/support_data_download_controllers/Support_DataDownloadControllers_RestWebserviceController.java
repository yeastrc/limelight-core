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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.support_data_download_controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
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
import org.yeastrc.limelight.limelight_webapp.services.Support_DataDownloadControllers_Service.DownloadStatus_DataDownloadControllers_Enum;
import org.yeastrc.limelight.limelight_webapp.services.Support_DataDownloadControllers_Service_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Support - Data Download Controllers - Data Download Status Tracking Webservice
 * 
 * throws NO errors
 *
 */
@RestController
public class Support_DataDownloadControllers_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Support_DataDownloadControllers_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private Support_DataDownloadControllers_Service_IF support_DataDownloadControllers_Service;
	
	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;


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
					+ AA_RestWSControllerPaths_Constants.SUPPORT_DATA_DOWNLOAD_VIA_FORM_SUBMIT_GET_NEW_DOWNLOAD_IDENTIFIER_STRING_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_GetNew(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
   	
    	try {
    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		
    		WebserviceRequest_GetNew webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest_GetNew.class );

    		if ( ! webserviceRequest.weuonklUUUQSJDVCWvweyhizwoqy ) {
    			
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		///
    		
    		WebserviceResult_GetNew webserviceResult = new WebserviceResult_GetNew();

    		webserviceResult.downloadIdentifier = support_DataDownloadControllers_Service.getNewDownload_Identifier_MarkAs_AboutToSubmit();
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );

			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    

	public static class WebserviceRequest_GetNew {
		
		private boolean weuonklUUUQSJDVCWvweyhizwoqy;

		public void setWeuonklUUUQSJDVCWvweyhizwoqy(boolean weuonklUUUQSJDVCWvweyhizwoqy) {
			this.weuonklUUUQSJDVCWvweyhizwoqy = weuonklUUUQSJDVCWvweyhizwoqy;
		}
	}

	public static class WebserviceResult_GetNew {
		
		private String downloadIdentifier;

		public String getDownloadIdentifier() {
			return downloadIdentifier;
		}
	}
	

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
					+ AA_RestWSControllerPaths_Constants.SUPPORT_DATA_DOWNLOAD_VIA_FORM_SUBMIT_GET_AFTER_STATUS_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_GetAfterStatus(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
   	
    	try {
    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		
    		WebserviceRequest_GetAfterStatus webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest_GetAfterStatus.class );

    		if ( StringUtils.isEmpty( webserviceRequest.downloadIdentifier ) ) {
    			
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		///
    		
    		WebserviceResult_GetAfterStatus webserviceResult = new WebserviceResult_GetAfterStatus();
    		
    		DownloadStatus_DataDownloadControllers_Enum downloadStatus_DataDownloadControllers_Enum =
    				support_DataDownloadControllers_Service.getDownload_Identifier_Status( webserviceRequest.downloadIdentifier );
    		
    		if ( downloadStatus_DataDownloadControllers_Enum == null ) {
    			webserviceResult.statusNotFound = true;
    			
    		} else if ( downloadStatus_DataDownloadControllers_Enum == DownloadStatus_DataDownloadControllers_Enum.SUCCESS ) {
    			
    			webserviceResult.statusSuccess = true;
    			
    			//  Remove since not needed anymore
    			
    			support_DataDownloadControllers_Service.removeDownload_Identifier( webserviceRequest.downloadIdentifier );
    			
    		} else if ( downloadStatus_DataDownloadControllers_Enum == DownloadStatus_DataDownloadControllers_Enum.FAIL ) {
    			
    			webserviceResult.statusFail = true;

    			//  Remove since not needed anymore
    			
    			support_DataDownloadControllers_Service.removeDownload_Identifier( webserviceRequest.downloadIdentifier );
    			
    		} else if ( downloadStatus_DataDownloadControllers_Enum == DownloadStatus_DataDownloadControllers_Enum.IN_PROGRESS ) {
    			webserviceResult.statusInProgress = true;
    			
    		} else if ( downloadStatus_DataDownloadControllers_Enum == DownloadStatus_DataDownloadControllers_Enum.ABOUT_TO_SUBMIT ) {
    			webserviceResult.statusAboutToSubmit = true;
    		}
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );

			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    
    /////////

	public static class WebserviceRequest_GetAfterStatus {
		
		private String downloadIdentifier;

		public void setDownloadIdentifier(String downloadIdentifier) {
			this.downloadIdentifier = downloadIdentifier;
		}
	}

	public static class WebserviceResult_GetAfterStatus {
		
		private boolean statusNotFound;
		private boolean statusSuccess;
		private boolean statusFail;
		private boolean statusInProgress;
		private boolean statusAboutToSubmit;
		
		public boolean isStatusSuccess() {
			return statusSuccess;
		}
		public boolean isStatusFail() {
			return statusFail;
		}
		public boolean isStatusInProgress() {
			return statusInProgress;
		}
		public boolean isStatusAboutToSubmit() {
			return statusAboutToSubmit;
		}
		public boolean isStatusNotFound() {
			return statusNotFound;
		}
	}
}
