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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;

/**
 * table project_tbl
 *
 */
public interface ProjectDAO_IF {

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	public ProjectDTO get_Title_ProjectLocked_ForId( int id ) throws SQLException;
	
	/**
	 * !!  Only populates title, abstract
	 * 
	 * @param id
	 * @return
	 * @throws SQLException 
	 */
	ProjectDTO getPartialForProjectPageForId(int id) throws SQLException;

	/**
	 * !!!  Only populates properties projectLocked, publicAccessLevel, public_access_locked, enabled, markedForDeletion,
	 * 
	 * @param projectId
	 * @return null if not found
	 * @throws Exception
	 */
	ProjectDTO getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( int projectId ) throws SQLException;
	
	/**
	 * !!!  Only populates properties PublicAccessCode, PublicAccessCodeEnabled
	 * 
	 * @param projectId
	 * @return null if not found
	 * @throws SQLException
	 */
	ProjectDTO getPublicAccessCodePublicAccessCodeEnabledForProjectId( int projectId ) throws SQLException;
	
	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	public String get_ShortName_ForId( int id ) throws SQLException;
	
	/**
	 * @param item
	 */
	public void save( ProjectDTO item );

	/**
	 * @param title
	 * @param projectId
	 * @param userId TODO
	 */
	void updateTitle( String title, int projectId, int userId );

	/**
	 * @param projectAbstract
	 * @param projectId
	 * @param userId TODO
	 */
	void updateAbstract( String projectAbstract, int projectId, int userId );

	/**
	 * @param markedForDeletion
	 * @param projectId
	 * @param userId TODO
	 */
	void updateMarkedForDeletion( boolean markedForDeletion, int projectId, int userId );

	/**
	 * @param projectLocked
	 * @param projectId
	 * @param userId TODO
	 */
	void updateProjectLocked( boolean projectLocked, int projectId, int userId );
	
	/**
	 * @param publicAccessLevel
	 * @param projectId
	 * @param userId TODO
	 */
	void updatePublicAccessLevel( Integer publicAccessLevel, int projectId, int userId );
	
	/**
	 * @param publicAccessCode
	 * @param publicAccessCodeEnabled
	 * @param projectId
	 * @param userId
	 */
	void updatePublicAccessCodePublicAccessCodeEnabled( String publicAccessCode, Boolean publicAccessCodeEnabled, int projectId, int userId );
	
	/**
	 * @param shortName
	 * @param projectId
	 * @param userId TODO
	 */
	void updateShortName( String shortName, int projectId, int userId );
}