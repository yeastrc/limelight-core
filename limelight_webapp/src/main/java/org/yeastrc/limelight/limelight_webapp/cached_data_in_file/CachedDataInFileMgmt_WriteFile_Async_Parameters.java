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

import java.io.File;

/**
 * Parameters to CachedDataInFileMgmt_WriteFile_Async
 * 
 * Package Private
 *
 */
class CachedDataInFileMgmt_WriteFile_Async_Parameters {
	
	private byte[] webservice_Request_Data;
	private byte[] webservice_Response_Data;
	
	private File controllerPath_Dir;
	private File subdir_1;
	private File subdir_2;

	private File cachedDataFile_Webservice_Request_File;
	private File cachedDataFile_Webservice_Response_File;
	private File cachedDataFile_Done_File;
	
	public byte[] getWebservice_Request_Data() {
		return webservice_Request_Data;
	}
	public void setWebservice_Request_Data(byte[] webservice_Request_Data) {
		this.webservice_Request_Data = webservice_Request_Data;
	}
	public byte[] getWebservice_Response_Data() {
		return webservice_Response_Data;
	}
	public void setWebservice_Response_Data(byte[] webservice_Response_Data) {
		this.webservice_Response_Data = webservice_Response_Data;
	}
	public File getCachedDataFile_Webservice_Request_File() {
		return cachedDataFile_Webservice_Request_File;
	}
	public void setCachedDataFile_Webservice_Request_File(File cachedDataFile_Webservice_Request_File) {
		this.cachedDataFile_Webservice_Request_File = cachedDataFile_Webservice_Request_File;
	}
	public File getCachedDataFile_Webservice_Response_File() {
		return cachedDataFile_Webservice_Response_File;
	}
	public void setCachedDataFile_Webservice_Response_File(File cachedDataFile_Webservice_Response_File) {
		this.cachedDataFile_Webservice_Response_File = cachedDataFile_Webservice_Response_File;
	}
	public File getCachedDataFile_Done_File() {
		return cachedDataFile_Done_File;
	}
	public void setCachedDataFile_Done_File(File cachedDataFile_Done_File) {
		this.cachedDataFile_Done_File = cachedDataFile_Done_File;
	}
	public File getSubdir_1() {
		return subdir_1;
	}
	public void setSubdir_1(File subdir_1) {
		this.subdir_1 = subdir_1;
	}
	public File getSubdir_2() {
		return subdir_2;
	}
	public void setSubdir_2(File subdir_2) {
		this.subdir_2 = subdir_2;
	}
	public File getControllerPath_Dir() {
		return controllerPath_Dir;
	}
	public void setControllerPath_Dir(File controllerPath_Dir) {
		this.controllerPath_Dir = controllerPath_Dir;
	}
	
}
