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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.objects.FileTrackingIdStatusId;

/**
 * @author danj
 *
 */
public interface FileImportTracking_All_SearcherIF {

	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	List<FileImportTrackingDTO> getAllForWebDisplayForProject(int projectId) throws Exception;

	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	List<FileTrackingIdStatusId> getAllStatusExceptInitInsertForProject(int projectId) throws Exception;

}