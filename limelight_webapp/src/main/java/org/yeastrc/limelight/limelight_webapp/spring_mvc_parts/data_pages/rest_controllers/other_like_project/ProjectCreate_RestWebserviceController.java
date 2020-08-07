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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.AddNewProjectUsingDBTransactionService;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

@RestController
public class ProjectCreate_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ProjectCreate_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;
	
	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
	@Autowired
	private AddNewProjectUsingDBTransactionService addNewProjectUsingDBTransactionService;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;
	
    /**
	 * 
	 */
	public ProjectCreate_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT_CREATE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  projectCreate(

    		@RequestBody ProjectSaveRequest projectSaveRequest,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
//		log.warn( "projectCreate(...) called" );
    	
    	try {
    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		UserSession userSession =
    				getUserSessionActualUserLoggedIn_ForRestController.userSessionOfActualUserLoggedIn( httpServletRequest );
    		if ( userSession == null ) {
    			throw new Limelight_WS_AuthError_Unauthorized_Exception();
    		}
    		
    		////////////////
    		
    		//  Auth Check
    		
    		if ( userSession.getUserAccessLevel() == null 
    				|| userSession.getUserAccessLevel() > AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER ) {

				throw new Limelight_WS_AuthError_Forbidden_Exception();  //  EARLY EXIT
			}
    		
    		//////////////////
    		
    		
    		int userId = userSession.getUserId();
    		
    		ProjectDTO projectDTO = new ProjectDTO();
    		projectDTO.setTitle( projectSaveRequest.getProjectTitle() );
    		projectDTO.setAbstractText( projectSaveRequest.getProjectAbstract() );
    		projectDTO.setCreatedByUserId( userId );
    		projectDTO.setUpdatedByUserId( userId );
    		
    		ProjectUserDTO projectUserDTO = new ProjectUserDTO();
    		projectUserDTO.setUserId( userId );
    		projectUserDTO.setAccessLevel( AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER );
    		
    		addNewProjectUsingDBTransactionService.addProject( projectDTO, projectUserDTO );

    		ProjectSaveResult projectSaveResult = new ProjectSaveResult();
    		
    		projectSaveResult.status = true;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( projectSaveResult );
    		
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
    

    /**
     * 
     *
     */
    public static class ProjectSaveRequest {
    	
		private String projectTitle;
		private String projectAbstract;
		
		public String getProjectTitle() {
			return projectTitle;
		}
		public void setProjectTitle(String projectTitle) {
			this.projectTitle = projectTitle;
		}
		public String getProjectAbstract() {
			return projectAbstract;
		}
		public void setProjectAbstract(String projectAbstract) {
			this.projectAbstract = projectAbstract;
		}

    }
    
    public static class ProjectSaveResult {
    	private boolean status;

		public boolean isStatus() {
			return status;
		}

		public void setStatus(boolean status) {
			this.status = status;
		}
    }
    
}


