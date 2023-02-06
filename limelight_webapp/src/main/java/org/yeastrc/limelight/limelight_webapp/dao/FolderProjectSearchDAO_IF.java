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

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.db_dto.FolderProjectSearchDTO;

/**
 * @author danj
 *
 */
public interface FolderProjectSearchDAO_IF {

	/**
	 * @param projectId
	 * @return 
	 * @throws Exception
	 */
	List<FolderProjectSearchDTO> getFolderProjectSearchDTO_ForProjectId(int projectId) throws Exception;

	/**
	 * @param item
	 */
	void saveOrUpdate(FolderProjectSearchDTO item, int createUserId);
	
	/**
	 * @param folderId
	 * @param projectSearchId
	 * @param newDisplayOrder
	 */
	void updateDisplayOrderFor_FolderId_ProjectSearchId( int folderId, int projectSearchId, int newDisplayOrder );

	/**
	 * @param not_In_ProjectSearchId_List
	 * @param folderId TODO
	 * @throws Exception
	 */
	void delete_NOT_In_ProjectSearchId_List(List<Integer> not_In_ProjectSearchId_List, int folderId);

}