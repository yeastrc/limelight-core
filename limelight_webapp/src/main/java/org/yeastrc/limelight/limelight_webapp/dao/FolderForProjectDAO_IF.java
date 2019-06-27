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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;
import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderForProjectDTO;

/**
 * @author danj
 *
 */
public interface FolderForProjectDAO_IF {

	/**
	 * Get the project id for id
	 * 
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	Integer getProjectIdForId(int id) throws SQLException;

	/**
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	FolderForProjectDTO getFolderForProjectDTO_ForId(int id) throws Exception;

	/**
	 * @param projectId
	 * @return 
	 * @throws Exception
	 */
	List<FolderForProjectDTO> getFolderForProjectDTO_ForProjectId(int projectId) throws Exception;

	/**
	 * @param item
	 */

	void save(FolderForProjectDTO item, int createUserId);

	/**
	 * @param id
	 * @param name
	 * @param updateUserId
	 */
	void updateName(int id, String name, int updateUserId);

	/**
	 * @param folderId
	 * @param newDisplayOrder
	 */
	public void updateDisplayOrder( int folderId, int newDisplayOrder );

	/**
	 * @param id
	 * @throws Exception
	 */
	void delete(int id);

}