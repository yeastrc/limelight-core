/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.webapp_admin_pages.rest_controllers;

import java.util.List;

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
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.Config_UpdateInsert_ConfigEntries_UsingDBTransactionService_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ConfigSystemDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Get Current Webapp Configuration
 *
 */
@RestController
public class WebappConfig_Config_Save_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( WebappConfig_Config_Save_RestWebserviceController.class );
	

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;

	@Autowired
	private Config_UpdateInsert_ConfigEntries_UsingDBTransactionService_IF config_UpdateInsert_ConfigEntries_UsingDBTransactionService;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_WebappAdmin_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_WebappAdmin_RestWSControllerPaths_Constants.WEBAPP_ADMIN_CONFIG_SAVE_REST_WEBSERVICE_CONTROLLER
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

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

			final String remoteIP = httpServletRequest.getRemoteAddr();

			WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class ); 

			WebserviceResult webserviceResult = webserviceMethodInternal( webserviceRequest, remoteIP, httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
			throw e;
			
		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}

	/**
	 * @param webserviceRequest
	 * @param remoteIP
	 * @param httpServletRequest
	 * @return
	 * @throws Exception
	 */
	private WebserviceResult webserviceMethodInternal( WebserviceRequest webserviceRequest, String remoteIP, HttpServletRequest httpServletRequest ) throws Exception {
		
		//		log.warn( "webserviceMethod(...) called" );
		
		UserSession userSession =
				getUserSessionActualUserLoggedIn_ForRestController.userSessionOfActualUserLoggedIn( httpServletRequest );

		if ( userSession.isGlobalAdminUser() || 
				( userSession.getUserAccessLevel() != null 
						&& userSession.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) ) {
			
		} else {
			//  Only admin user authorized to access this page
			
			throw new Limelight_WS_AuthError_Forbidden_Exception();
		}

		List<ConfigSystemDTO> configList = webserviceRequest.configList;
		
		///  Validate config keys and values (from checkboxes) are valid
		
		for ( ConfigSystemDTO item : configList ) {
			if ( ( ! ConfigSystemsKeysConstants.textConfigKeys.contains( item.getConfigKey() ) )
					&& ( ! ConfigSystemsKeysSharedConstants.textConfigKeys.contains( item.getConfigKey() ) ) ) {
				
				if ( ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES.equals( item.getConfigKey() ) ) {
					//  Not one of the text config keys so validate the config keys with specific values
					if ( ( ! ConfigSystemsValuesSharedConstants.TRUE.equals( item.getConfigValue() ) )
							&& ( ! ConfigSystemsValuesSharedConstants.FALSE.equals( item.getConfigValue() ) ) ) {
						//  Invalid value for config key found
						String msg = "Invalid value for config key: " + item.getConfigKey();
						log.warn( msg );
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
					}
				} else if ( ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES__ALL_AFTER_3_DAYS.equals( item.getConfigKey() ) ) {
						//  Not one of the text config keys so validate the config keys with specific values
						if ( ( ! ConfigSystemsValuesSharedConstants.TRUE.equals( item.getConfigValue() ) )
								&& ( ! ConfigSystemsValuesSharedConstants.FALSE.equals( item.getConfigValue() ) ) ) {
							//  Invalid value for config key found
							String msg = "Invalid value for config key: " + item.getConfigKey();
							log.warn( msg );
							throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
						}
				} else {
					//  Invalid config key found
					String msg = "Invalid config key: " + item.getConfigKey();
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();	
				}
			}
		}
		
		//  Save values to DB
		config_UpdateInsert_ConfigEntries_UsingDBTransactionService.updateValueOnlyOnConfigKey( configList );

		WebserviceResult webserviceResult = new WebserviceResult();

		return webserviceResult;
	}
	


	public static class WebserviceRequest {

		private List<ConfigSystemDTO> configList;

		public void setConfigList(List<ConfigSystemDTO> configList) {
			this.configList = configList;
		}
	}

	public static class WebserviceResult {

		private String status;

		public String getStatus() {
			return status;
		}
	}

}
