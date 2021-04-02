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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchIdCodeDTO;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchIdCodeDAO.LogDuplicateSQLException;

/**
 * @author danj
 *
 */
public interface ProjectSearchIdCodeDAO_IF {

	/**
	 * 
	 * 
	 * @param projectSearchId
	 * @return null if not found
	 * @throws SQLException
	 */

	String getByProjectSearchId(int projectSearchId) throws SQLException;

	/**
	 * 
	 * 
	 * @param projectSearchId
	 * @return null if not found
	 * @throws SQLException
	 */

	List<ProjectSearchIdCodeDTO> getByProjectSearchIdList(List<Integer> projectSearchIdList) throws SQLException;

	/**
	 * 
	 * 
	 * @param project_search_id_codeList
	 * @throws SQLException
	 */

	public List<ProjectSearchIdCodeDTO> getProjectSearchIdCodeDTOList_For_project_search_id_codes( List<String> project_search_id_codeList ) throws SQLException; 

	/**
	 * @param item
	 */

	void save(ProjectSearchIdCodeDTO item, LogDuplicateSQLException logDuplicateSQLException);

}