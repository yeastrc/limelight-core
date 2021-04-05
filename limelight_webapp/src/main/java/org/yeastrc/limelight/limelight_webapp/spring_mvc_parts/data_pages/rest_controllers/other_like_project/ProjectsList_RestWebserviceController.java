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

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
import org.yeastrc.limelight.limelight_webapp.access_control.direct_user_session.UserIsAdminCheckIF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectListItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectListAllSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectListForUserIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

@RestController
public class ProjectsList_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ProjectsList_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private UserIsAdminCheckIF userIsAdminCheck;
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ProjectListAllSearcherIF projectListAllSearcher;
	
	@Autowired
	private ProjectListForUserIdSearcherIF projectListForUserIdSearcher;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;
	
	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
    /**
	 * 
	 */
	public ProjectsList_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT_LIST_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  projectList(
    		
    		@RequestBody WebserviceRequest projectListRequest,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws IOException, SQLException {
//		log.warn( "projectList(...) called" );
    	
    	try {

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		UserSession userSession =
    				getUserSessionActualUserLoggedIn_ForRestController.userSessionOfActualUserLoggedIn( httpServletRequest );
    		
    		int userId = userSession.getUserId();
    		
    		List<WebserviceResultListItem> projectList = null;
    		
    		if ( userIsAdminCheck.userIsAdmin( userSession ) ) {

    			List<ProjectListItem> projectListFromDB = projectListAllSearcher.getProjectListAll();
    			
    			projectList = new ArrayList<>( projectListFromDB.size() );
    			
    			for ( ProjectListItem projectItemFromDB : projectListFromDB  ) {
    				
    				WebserviceResultListItem projectItem = new WebserviceResultListItem();
    				
    				projectItem.id = projectItemFromDB.getId();
    				projectItem.title = projectItemFromDB.getTitle();
    				projectItem.projectLocked = projectItemFromDB.isProjectLocked();
    				if ( ! projectItemFromDB.isProjectLocked() ) {
    					projectItem.canDelete = true;
    				}
    				projectItem.projectPublic = projectItemFromDB.isProjectPublic();
    				projectItem.projectPublicAccessEnabled = projectItemFromDB.isProjectPublicAccessEnabled();
    				projectList.add( projectItem );
    			}
    		} else {
    			
    			List<ProjectListItem> projectListFromDB = projectListForUserIdSearcher.getProjectListForUserId( userId );
    			
    			projectList = new ArrayList<>( projectListFromDB.size() );
    			
    			for ( ProjectListItem projectItemFromDB : projectListFromDB  ) {
    				
    				WebserviceResultListItem projectItem = new WebserviceResultListItem();
    				
    				projectItem.id = projectItemFromDB.getId();
    				projectItem.title = projectItemFromDB.getTitle();
    				projectItem.projectLocked = projectItemFromDB.isProjectLocked();
    				if ( ! projectItemFromDB.isProjectLocked() && projectItemFromDB.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER ) {
    					projectItem.canDelete = true;
    				}
    				projectItem.projectPublic = projectItemFromDB.isProjectPublic();
    				projectItem.projectPublicAccessEnabled = projectItemFromDB.isProjectPublicAccessEnabled();
    				projectList.add( projectItem );
    			}
    		}

    		WebserviceResult projectListResult = new WebserviceResult();
    		projectListResult.projectList = projectList;

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( projectListResult );
    		
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
    

    public static class WebserviceRequest {
    	//  No params
    }
    
    public static class WebserviceResult {
    	List<WebserviceResultListItem> projectList;

		public List<WebserviceResultListItem> getProjectList() {
			return projectList;
		}
		public void setProjectList(List<WebserviceResultListItem> projectList) {
			this.projectList = projectList;
		}
    }

	public static class WebserviceResultListItem {
	
		private int id;
		private String title;
		private boolean projectLocked;
		private boolean canDelete;
		private boolean projectPublic;
		private boolean projectPublicAccessEnabled;
		
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public boolean isProjectLocked() {
			return projectLocked;
		}
		public void setProjectLocked(boolean projectLocked) {
			this.projectLocked = projectLocked;
		}
		public boolean isCanDelete() {
			return canDelete;
		}
		public void setCanDelete(boolean canDelete) {
			this.canDelete = canDelete;
		}
		public boolean isProjectPublic() {
			return projectPublic;
		}
		public void setProjectPublic(boolean projectPublic) {
			this.projectPublic = projectPublic;
		}
		public boolean isProjectPublicAccessEnabled() {
			return projectPublicAccessEnabled;
		}
		public void setProjectPublicAccessEnabled(boolean projectPublicAccessEnabled) {
			this.projectPublicAccessEnabled = projectPublicAccessEnabled;
		}
	}

    
	

	public ProjectDAO_IF getProjectDAO() {
		return projectDAO;
	}

	public void setProjectDAO(ProjectDAO_IF projectDAO) {
		this.projectDAO = projectDAO;
	}

	public ProjectListAllSearcherIF getProjectListAllSearcher() {
		return projectListAllSearcher;
	}

}


