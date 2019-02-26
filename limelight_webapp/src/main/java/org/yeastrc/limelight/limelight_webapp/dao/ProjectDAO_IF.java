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
	public ProjectDTO getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( int projectId ) throws SQLException;

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
	 */
	void updateTitle( String title, int projectId );

	/**
	 * @param projectAbstract
	 * @param projectId
	 */
	void updateAbstract( String projectAbstract, int projectId );

	/**
	 * @param markedForDeletion
	 * @param projectId
	 */
	void updateMarkedForDeletion( boolean markedForDeletion, int projectId );

	/**
	 * @param projectLocked
	 * @param projectId
	 */
	void updateProjectLocked( boolean projectLocked, int projectId );
	
	/**
	 * @param publicAccessLevel
	 * @param projectId
	 */
	void updatePublicAccessLevel( Integer publicAccessLevel, int projectId );
	
	/**
	 * @param shortName
	 * @param projectId
	 */
	void updateShortName( String shortName, int projectId );
}