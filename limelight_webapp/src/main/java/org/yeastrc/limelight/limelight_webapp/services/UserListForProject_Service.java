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
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.objects.UserDisplay_ProjectPage;
import org.yeastrc.limelight.limelight_webapp.searchers.UserListForProjectIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.UserListForProjectIdSearcherItem;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * 
 *
 */
@Component
public class UserListForProject_Service implements UserListForProject_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( UserListForProject_Service.class );
	
	@Autowired
	private UserListForProjectIdSearcherIF userListForProjectIdSearcher;
	
	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.UserListForProject_ServiceIF#getUserListForProject(int,UserSession,WebSessionAuthAccessLevel)
	 */
	@Override
	public List<UserDisplay_ProjectPage> getUserListForProject( 
			int projectId,
			UserSession userSession,
			WebSessionAuthAccessLevel webSessionAuthAccessLevel ) throws Exception {
		
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
			
			if ( userListForProjectIdSearcherItem.getUserProjectAccessLevelId() <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER ) {
				resultItem.setProjectOwner( true );
			} else if ( userListForProjectIdSearcherItem.getUserProjectAccessLevelId() == AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER ) {
				resultItem.setResearcher( true );
			}
			
			if ( userSession != null && userSession.getUserId() != null && userSession.getUserId() != userListForProjectIdSearcherItem.getUserId() ) {
				//  user is in list is not user in user session.  To not allow user to change themselves
				
				if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
					
					//  Change to 'if' condition excludes when project is locked
					
					//  User Session is at least Project Owner   
					//     Can remove entry
					resultItem.setCanRemoveEntry(true);
				}
				if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
					//  User Session is Project Owner.  Can Promote or demote entry
					if ( userListForProjectIdSearcherItem.getUserProjectAccessLevelId() <= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER ) {
						resultItem.setCanDemoteEntry(true);
					}
					if ( userListForProjectIdSearcherItem.getUserProjectAccessLevelId() >= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER ) {
						resultItem.setCanPromoteEntry(true);
					}
				}
			}
			
			resultList.add( resultItem );
		}
		return resultList;
	}
}
