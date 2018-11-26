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
package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.objects_request_scope.ProjectTitleHeaderDisplay;
import org.yeastrc.limelight.limelight_webapp.objects_request_scope.UserInfoForPageHeader;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Populate Page Header Data in the HttpServletRequest.Attribute Space
 *
 */
@Component
public class PopulatePageHeaderData implements PopulatePageHeaderDataIF {
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private TruncateProjectTitleForDisplayIF truncateProjectTitleForDisplay;

	/**
	 * @param projectId
	 * @param userSession - Get from GetWebSessionAuthAccessLevelForProjectIds so is current with DB
	 * @param request
	 * @throws Exception 
	 */
	@Override
	public void populatePageHeaderData( List<Integer> projectIds, UserSession userSession, HttpServletRequest httpServletRequest ) throws Exception {
		
		if ( projectIds != null && projectIds.size() == 1 ) {
			
			ProjectDTO projectDTO = projectDAO.get_Title_ProjectLocked_ForId( projectIds.get( 0 ) );
			
			if ( projectDTO != null ) {

				ProjectTitleHeaderDisplay project = new ProjectTitleHeaderDisplay();
				project.setProjectId( projectDTO.getId() );
				project.setProjectLocked( projectDTO.isProjectLocked() );
				project.setTitleFull( projectDTO.getTitle() );
				String titleHeaderDisplay = truncateProjectTitleForDisplay.truncateProjectTitleForHeader( projectDTO.getTitle() );
				project.setTitleHeaderDisplay( titleHeaderDisplay );
				String titleHeaderDisplayNonUser = truncateProjectTitleForDisplay.truncateProjectTitleForHeaderNonUser( projectDTO.getTitle() );
				project.setTitleHeaderDisplayNonUser( titleHeaderDisplayNonUser );
				httpServletRequest.setAttribute( WebConstants.REQUEST_WEB_SESSION_HEADER_PROJECT_INFO, project );
			}
		}
		
		// If no user session, skip rest.
		
		if ( userSession == null || userSession.getUserId() == null ) {
			//  No User session 
			return;
		}
		
		if ( userSession.isActualUser() ) {
			//  have a logged in user
			boolean headerUserIsAdmin = false;
			if ( userSession.getUserAccessLevel() != null 
					&& userSession.getUserAccessLevel() == AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) {
				headerUserIsAdmin = true;
			}
			httpServletRequest.setAttribute( WebConstants.REQUEST_WEB_SESSION_HEADER_USER_IS_ADMIN, headerUserIsAdmin );
			
			UserInfoForPageHeader userInfoForPageHeader = new UserInfoForPageHeader();
			userInfoForPageHeader.setUsername( userSession.getUsername() );
			userInfoForPageHeader.setUser_displayFirstName( userSession.getFirstName() );
			userInfoForPageHeader.setUser_displayLastName( userSession.getLastName() );
			
			httpServletRequest.setAttribute( WebConstants.REQUEST_WEB_SESSION_HEADER_USER_INFO, userInfoForPageHeader );
		}
	}
}
