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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.dao.UserInviteTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;

/**
 * 
 *
 */
@Component
public class UserInvitesActiveUnusedNotReplacedNotRevokedSearcher extends Limelight_JDBC_Base implements UserInvitesActiveUnusedNotReplacedNotRevokedSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( UserInvitesActiveUnusedNotReplacedNotRevokedSearcher.class );
	
	@Autowired
	private UserInviteTrackingDAO_IF userInviteTrackingDAO;

	/**
	 * Get invite tracking records where invite has not been used, replaced, or revoked, All records 
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<UserInviteTrackingDTO> getUserInvitesActiveAllInvites(  ) throws SQLException {
		return getUserInvitesActiveUnused( true /* getAllInvites */, 0 /* projectId */, false /* useProjectId */);
	}
	/**
	 * Get invite tracking records for projectId where invite has not been used, replaced, or revoked 
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<UserInviteTrackingDTO> getUserInvitesActiveForProjectId( int projectId ) throws SQLException {
		return getUserInvitesActiveUnused( false /* getAllInvites */, projectId, true /* useProjectId */);
	}
	/**
	 * Get invite tracking records where projectId is NULL where invite has not been used, replaced, or revoked 
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<UserInviteTrackingDTO> getUserInvitesActiveForProjectIdNULL(  ) throws SQLException {
		return getUserInvitesActiveUnused( false /* getAllInvites */, 0 /* projectId */, false /* useProjectId */);
	}

	private final String sqlBase = "SELECT id " 
			+ " FROM user_invite_tracking_tbl WHERE  "
			+ " ( invite_used IS NULL OR invite_used = 0 )"
			+ " AND ( code_replaced_by_newer IS NULL OR code_replaced_by_newer = 0 )"
			+ " AND ( invite_revoked IS NULL OR invite_revoked = 0 )";
	
	private final String sqlAllInvites = sqlBase;
	private final String sqlWhereProjectIdIsNULL = sqlBase  
			+ " AND invited_project_id IS NULL ";
	private final String sqlWithProjectId = sqlBase 
			+ " AND invited_project_id = ? ";
	
	/**
	 * Get invite tracking records  where invite has not been used, replaced, or revoked 
	 * @param projectId
	 * @param useProjectId
	 * @return
	 * @throws SQLException
	 */
	private List<UserInviteTrackingDTO> getUserInvitesActiveUnused( boolean getAllInvites, int projectId, boolean useProjectId ) throws SQLException {
		
		List<UserInviteTrackingDTO> returnList = new ArrayList<UserInviteTrackingDTO>();
		String querySQL = sqlWithProjectId;
		if ( getAllInvites ) {
			querySQL = sqlAllInvites;
		} else if ( ! useProjectId ) { 
			querySQL = sqlWhereProjectIdIsNULL;
		}

		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			if ( useProjectId ) {
				preparedStatement.setInt( 1, projectId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					int id = rs.getInt( "id" );
					UserInviteTrackingDTO item = userInviteTrackingDAO.getForInviteTrackingId( id );
					returnList.add(item);
				}
			}
		} catch ( SQLException e ) {
			String msg = "Failed to query, projectId: " + projectId
					 + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnList; 
	}

}
