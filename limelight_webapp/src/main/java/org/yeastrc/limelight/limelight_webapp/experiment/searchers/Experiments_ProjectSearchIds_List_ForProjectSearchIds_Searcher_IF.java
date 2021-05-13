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
package org.yeastrc.limelight.limelight_webapp.experiment.searchers;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

import org.yeastrc.limelight.limelight_webapp.experiment.searchers.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result;

/**
 * @author danj
 *
 */
public interface Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_IF {

	/**
	 * @param projectId
	 * @param draft - If set, restrict to this value
	 * @param userId - If set, restrict to user
	 * @return properties on objects set: id, name, createdByUserId
	 * @throws SQLException
	 */

	List<Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result> getExperiments_ProjectSearchIds_List_ForProjectSearchIds(
			Set<Integer> projectSearchIds) throws SQLException;

}