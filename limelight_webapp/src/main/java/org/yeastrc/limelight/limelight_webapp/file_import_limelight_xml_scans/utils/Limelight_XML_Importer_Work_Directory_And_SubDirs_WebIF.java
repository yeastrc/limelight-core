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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils;

import java.io.File;
import java.io.IOException;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;

/**
 * @author danj
 *
 */
public interface Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF {

	/**
	 * @return
	 */
	String getDirForUploadFileTempDir();

	/**
	 * @param userId
	 * @param uploadKey
	 * @param uploadTempBase
	 * @return null if subdir already exists
	 * @throws LimelightWebappFileUploadFileSystemException 
	 * @throws IOException 
	 */
	File createSubDirForUploadFileTempDir(int userId, long uploadKey, File uploadTempBase)
			throws LimelightWebappFileUploadFileSystemException, IOException;

	/**
	 * @param userId
	 * @param uploadKey
	 * @param uploadTempBase
	 * @return
	 * @throws LimelightWebappFileUploadFileSystemException 
	 * @throws IOException 
	 */
	File getSubDirForUploadFileTempDir(int userId, long uploadKey, File uploadTempBase)
			throws LimelightWebappFileUploadFileSystemException, IOException;

	/**
	 * @param fileIndex
	 * @param uploadTempBase
	 * @return
	 */
	File getDataFile(int fileIndex, File uploadTempBase);

	/**
	 * @param fileIndex
	 * @param uploadTempBase
	 * @return
	 * @throws LimelightWebappFileUploadFileSystemException 
	 */
	File getUploadFile(String scanFileSuffix, int fileIndex, FileImportFileType fileType, File uploadTempBase)
			throws LimelightWebappFileUploadFileSystemException;

}