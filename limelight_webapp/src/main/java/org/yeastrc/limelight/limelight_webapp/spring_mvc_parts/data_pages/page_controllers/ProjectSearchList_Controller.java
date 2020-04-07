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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.access_control.direct_user_session.UserIsAdminCheckIF;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectListItem;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
import org.yeastrc.limelight.limelight_webapp.objects.UserDisplay_ProjectPage;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectListAllSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectListForUserIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchListForProjectIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.UserListForProjectIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.UserListForProjectIdSearcherItem;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;

/**
 * List the projects.  For each project list the searches and users
 *
 */
@Controller
//@RequestMapping("/")
public class ProjectSearchList_Controller {

	private static final Logger log = LoggerFactory.getLogger( ProjectSearchList_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.PROJECT_SEARCH_LIST_PAGE_CONTROLLER;

	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;
	
	@Autowired
	private UserIsAdminCheckIF userIsAdminCheck;
	
	@Autowired
	private ProjectListAllSearcherIF projectListAllSearcher;
	
	@Autowired
	private ProjectListForUserIdSearcherIF projectListForUserIdSearcher;

	@Autowired
	private UserListForProjectIdSearcherIF userListForProjectIdSearcher;

	@Autowired
	private SearchListForProjectIdSearcherIF searchListForProjectIdSearcher;

	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
	
    /**
	 * 
	 */
	public ProjectSearchList_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}

	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = { 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH } )
	
    public String projectsList(
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "projectsList(...) called" );
		try {
			UserSession userSession = accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );

			if ( userSession == null || ( ! userSession.isActualUser() ) ) {
				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER;
			}

			populatePageHeaderData.populatePageHeaderData( null /* projectIds */, userSession, httpServletRequest );
			
			createList( userSession, httpServletRequest );

			return "data_pages/other_data_pages/projectSearchList.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch ( Exception e ) {
			
			String msg = "Exception: ";
			log.error( msg, e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new RuntimeException( e ); //  TODO forward to error page
		}
    }
	
	/**
	 * @param userSession
	 * @param httpServletRequest
	 * @throws Exception
	 */
	private void createList( UserSession userSession, HttpServletRequest httpServletRequest ) throws Exception {

		int userId = userSession.getUserId();
		
		List<ProjectListItem> projectListFromDB = null;
		
		if ( userIsAdminCheck.userIsAdmin( userSession ) ) {

			projectListFromDB = projectListAllSearcher.getProjectListAll();
			
		} else {
			
			projectListFromDB = projectListForUserIdSearcher.getProjectListForUserId( userId );
		}
		
		List<ProjectForDisplay> projectList = new ArrayList<>( projectListFromDB.size() );
		
		for ( ProjectListItem project : projectListFromDB ) {
			
			int projectId = project.getId();
			
			ProjectForDisplay projectForDisplay = new ProjectForDisplay(); 
			projectForDisplay.projectMain = project;

			List<UserDisplay_ProjectPage> userListForProject = getUserListForProject( projectId, userSession );

			//  Sort on last name then first name
			Collections.sort( userListForProject, new Comparator<UserDisplay_ProjectPage>() {
				@Override
				public int compare(UserDisplay_ProjectPage o1, UserDisplay_ProjectPage o2) {
					int lastNameCompare = o1.getLastName().compareTo( o2.getLastName() );
					if ( lastNameCompare != 0 ) {
						return lastNameCompare;
					}
					return o1.getFirstName().compareTo( o2.getFirstName() );
				}
			});
			StringBuilder usersSB = new StringBuilder( 1000 );
			for ( UserDisplay_ProjectPage userDisplay : userListForProject ) {
				if ( usersSB.length() != 0 ) {
					usersSB.append( ", " );
				}
				usersSB.append( userDisplay.getFirstName() );
				usersSB.append( " " );
				usersSB.append( userDisplay.getLastName() );
			}
			String users = usersSB.toString();
			projectForDisplay.users = users;
			

    		List<SearchItemMinimal> searchListDB = searchListForProjectIdSearcher.getSearchListForProjectId( projectId );
    		
    		projectForDisplay.searches = searchListDB;
    		
//    		log.warn( "projectForDisplay: " + projectForDisplay );
			
			projectList.add(projectForDisplay);
		}
		
		httpServletRequest.setAttribute( "projectList" , projectList );
		
	}
	
	/**
	 * Copied from class UserListForProject_Service since need to remove some parts
	 * 
	 * @param projectId
	 * @param userSession
	 * @return
	 * @throws Exception
	 */
	private List<UserDisplay_ProjectPage> getUserListForProject( 
			int projectId,
			UserSession userSession ) throws Exception {
		
		List<UserListForProjectIdSearcherItem> userListForProjectIdSearcherItemList = 
				userListForProjectIdSearcher.getUserListForProjectIdSearcher( projectId );
		
		List<UserDisplay_ProjectPage> resultList = new ArrayList<>( userListForProjectIdSearcherItemList.size() );
		
		for ( UserListForProjectIdSearcherItem userListForProjectIdSearcherItem : userListForProjectIdSearcherItemList ) {
			
			UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
			// TODO Session Key check currently Disabled in web service 
//			userMgmtGetUserDataRequest.setSessionKey( userMgmtLoginResponse.getSessionKey() );
			userMgmtGetUserDataRequest.setUserId( userListForProjectIdSearcherItem.getUserMgmtUserId() );
			
			UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
					userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
			
			if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
				String msg = "Failed to get Full user data from User Mgmt Webapp for UserId: " + userListForProjectIdSearcherItem.getUserId()
						+ ", userMgmtUserId: " + userListForProjectIdSearcherItem.getUserMgmtUserId();
				log.warn( msg );
		        continue;  //  EARLY CONTINUE from processing this item
			}

			if ( ! userMgmtGetUserDataResponse.isEnabled() ) {
				// Skip user since not enabled in User Mgmt
//				String msg = "User is not enabled in User Mgmt Webapp for UserId: " + userListForProjectIdSearcherItem.getUserId()
//						+ ", userMgmtUserId: " + userListForProjectIdSearcherItem.getUserMgmtUserId();
//				log.warn( msg );
		        continue;  //  EARLY CONTINUE from processing this item
			}
			
			UserDisplay_ProjectPage resultItem = new UserDisplay_ProjectPage();
			resultItem.setUserId( userListForProjectIdSearcherItem.getUserId() );
			resultItem.setFirstName( userMgmtGetUserDataResponse.getFirstName() );
			resultItem.setLastName( userMgmtGetUserDataResponse.getLastName() );
			
			resultList.add( resultItem );
		}
		return resultList;
	}
	
	

	public static class ProjectForDisplay {
		
		private ProjectListItem projectMain;
		private List<SearchItemMinimal> searches;
		private String users;
		
		@Override
		public String toString() {
			return "ProjectForDisplay [projectMain=" + projectMain + ", searches=" + searches + ", users=" + users
					+ "]";
		}

		public ProjectListItem getProjectMain() {
			return projectMain;
		}

		public void setProjectMain(ProjectListItem projectMain) {
			this.projectMain = projectMain;
		}

		public List<SearchItemMinimal> getSearches() {
			return searches;
		}

		public void setSearches(List<SearchItemMinimal> searches) {
			this.searches = searches;
		}

		public String getUsers() {
			return users;
		}

		public void setUsers(String users) {
			this.users = users;
		}
		

	}

}