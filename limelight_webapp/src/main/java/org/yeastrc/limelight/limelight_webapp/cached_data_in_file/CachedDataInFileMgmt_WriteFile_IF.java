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
package org.yeastrc.limelight.limelight_webapp.cached_data_in_file;

import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_WriteFile.CachedDataInFileMgmt_WriteFile_Parameters;

/**
 * @author danj
 *
 */
public interface CachedDataInFileMgmt_WriteFile_IF {

	/**
	 * @param cachedDataInFileMgmt_WriteFile_Parameters
	 */
	void cachedDataInFileMgmt_WriteFile(
			CachedDataInFileMgmt_WriteFile_Parameters cachedDataInFileMgmt_WriteFile_Parameters) throws Exception;

}