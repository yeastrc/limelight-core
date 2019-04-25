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
package org.yeastrc.limelight.limelight_webapp.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.DateFormatConstants;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.searchers.UserInvitesActiveUnusedNotReplacedNotRevokedSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project.ProjectView_UserInviteList_RestWebserviceController.InvitedPersonDisplay;

/**
 * 
 *
 */
@Component
public class GetInvitedPeopleDisplayListAll_Service implements GetInvitedPeopleDisplayListAll_Service_IF {

	private static final Logger log = LoggerFactory.getLogger( GetInvitedPeopleDisplayListAll_Service.class );
	
	@Autowired
	private UserInvitesActiveUnusedNotReplacedNotRevokedSearcherIF userInvitesActiveUnusedNotReplacedNotRevokedSearcher;
	
	/**
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<InvitedPersonDisplay> getInvitedPersonDisplayListAll( ) throws Exception {
		try {

			SimpleDateFormat simpleDateFormat = new SimpleDateFormat( DateFormatConstants.DATE_FORMAT_YYYY_MM_DD );

			List<UserInviteTrackingDTO> inviteList = userInvitesActiveUnusedNotReplacedNotRevokedSearcher.getUserInvitesActiveAllInvites();
			List<InvitedPersonDisplay> returnList = new ArrayList<>( inviteList.size() );
			for ( UserInviteTrackingDTO invite : inviteList ) {
				InvitedPersonDisplay invitedPersonDisplay = new InvitedPersonDisplay();
				invitedPersonDisplay.setInviteId( invite.getId() );
				invitedPersonDisplay.setInvitedUserEmail( invite.getInvitedUserEmail() );
				
				//  TODO TEMP COmment out, need to replace with something
//				invitedPersonDisplay.setInvitedUserAccessLevel( invite.getInvitedUserAccessLevel() );
				
				String formattedDate =  simpleDateFormat.format( invite.getInviteCreateDate() );
				invitedPersonDisplay.setInviteDate( formattedDate );
				Integer invitedProjectId = invite.getInvitedProjectId();
				if ( invitedProjectId != null ) {
					invitedPersonDisplay.setProjectId( invitedProjectId );
				}
				returnList.add( invitedPersonDisplay );
			}
			return returnList;
		} catch ( Exception ex ) {
			String msg = "Error processing getInvitedPersonDisplayListAll()";
			log.error( msg, ex );
			throw ex;
		}
	}

}
