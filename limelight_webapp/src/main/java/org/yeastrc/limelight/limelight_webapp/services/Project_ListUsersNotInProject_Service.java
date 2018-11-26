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
package org.yeastrc.limelight.limelight_webapp.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.objects.Project_UserNotInProject;
import org.yeastrc.limelight.limelight_webapp.searchers.Project_UsersNotInTheProjectList_ForProjectIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.Project_UsersNotInTheProjectList_ForProjectIdSearcherItem;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * 
 *
 */
@Component
public class Project_ListUsersNotInProject_Service implements Project_ListUsersNotInProject_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( Project_ListUsersNotInProject_Service.class );
	
	@Autowired
	private Project_UsersNotInTheProjectList_ForProjectIdSearcherIF project_UsersNotInTheProjectList_ForProjectIdSearcher;
	
	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.Project_ListUsersNotInProject_ServiceIF#listUsersNotInProject_Service(int, org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession, org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel)
	 */
	@Override
	public List<Project_UserNotInProject> listUsersNotInProject_Service( 
			int projectId,
			String lastNamePrefix,
			UserSession userSession,
			WebSessionAuthAccessLevel webSessionAuthAccessLevel ) throws Exception {
		
		List<Project_UsersNotInTheProjectList_ForProjectIdSearcherItem> project_UsersNotInTheProjectList_ForProjectIdSearcherItemList = 
				project_UsersNotInTheProjectList_ForProjectIdSearcher.getProject_UsersNotInTheProjectList_ForProjectIdSearcher( projectId );
		
		List<Project_UserNotInProject> resultList = new ArrayList<>( project_UsersNotInTheProjectList_ForProjectIdSearcherItemList.size() );
		
		for ( Project_UsersNotInTheProjectList_ForProjectIdSearcherItem project_UsersNotInTheProjectList_ForProjectIdSearcherItem : project_UsersNotInTheProjectList_ForProjectIdSearcherItemList ) {
			
			UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
			// TODO Session Key check currently Disabled in web service 
//			userMgmtGetUserDataRequest.setSessionKey( userMgmtLoginResponse.getSessionKey() );
			userMgmtGetUserDataRequest.setUserId( project_UsersNotInTheProjectList_ForProjectIdSearcherItem.getUserMgmtUserId() );
			
			UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
					userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
			
			if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
				String msg = "Failed to get Full user data from User Mgmt Webapp for UserId: " + project_UsersNotInTheProjectList_ForProjectIdSearcherItem.getUserId()
						+ ", userMgmtUserId: " + project_UsersNotInTheProjectList_ForProjectIdSearcherItem.getUserMgmtUserId();
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
			
			if ( userMgmtGetUserDataResponse.getLastName() == null ) {
				String msg = "Dropping record: userMgmtGetUserDataResponse.getLastName() == null:  UserId: " + project_UsersNotInTheProjectList_ForProjectIdSearcherItem.getUserId();
				log.warn( msg );
		        continue;  //  EARLY CONTINUE from processing this item
			}
			
			if ( StringUtils.isNotEmpty( lastNamePrefix ) ) {
				
				String userLastName = userMgmtGetUserDataResponse.getLastName();
			
				if ( lastNamePrefix.length() > userLastName.length() ) {
					//  lastNamePrefix Cannot be substring of userLastName
					continue;  //  EARLY CONTINUE from processing this item
				}
				
				String userLastNameSubstrTo_lastNamePrefixLength = userLastName.substring(0, lastNamePrefix.length() );
			
				if ( ! userLastNameSubstrTo_lastNamePrefixLength.equalsIgnoreCase( lastNamePrefix ) ) {
					//  Last name not start with prefix provided, ignoring case
					continue;  //  EARLY CONTINUE from processing this item
				}
			}
			
			Project_UserNotInProject resultItem = new Project_UserNotInProject();
			resultItem.setUserId( project_UsersNotInTheProjectList_ForProjectIdSearcherItem.getUserId() );
			resultItem.setFirstName( userMgmtGetUserDataResponse.getFirstName() );
			resultItem.setLastName( userMgmtGetUserDataResponse.getLastName() );
						
			resultList.add( resultItem );
		}
		return resultList;
	}
}
