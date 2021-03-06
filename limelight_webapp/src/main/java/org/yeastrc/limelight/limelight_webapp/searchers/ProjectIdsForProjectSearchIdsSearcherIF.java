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

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Get the project id for project search ids
 *
 */
public interface ProjectIdsForProjectSearchIdsSearcherIF {

	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException
	 */
//	List<Integer> getProjectIdListForProjectSearchIds(List<Integer> projectSearchIds) throws SQLException;


	/**
	 * @param projectSearchIds
	 * @return Map<ProjectSearchId, ProjectId>
	 * @throws SQLException
	 */
	Map<Integer,Integer> getProjectIdMappingForProjectSearchIds( List<Integer> projectSearchIds ) throws SQLException;
}