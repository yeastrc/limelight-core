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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.LimelightXMLFileUploadWebConstants;

/**
 * 
 *
 */
@Component
public class Limelight_XML_Importer_Work_Directory_And_SubDirs_Web implements Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF {

	private static final Logger log = LoggerFactory.getLogger( Limelight_XML_Importer_Work_Directory_And_SubDirs_Web.class );
	
	/**
	 * @return
	 */
	@Override
	public String getDirForUploadFileTempDir( ) {
		String dirName = FileUploadCommonConstants.UPLOAD_FILE_TEMP_BASE_DIR;
		return dirName;
	}
	
	/**
	 * @param userId
	 * @param uploadKey
	 * @param uploadTempBase
	 * @return null if subdir already exists
	 * @throws LimelightWebappFileUploadFileSystemException 
	 * @throws IOException 
	 */
	@Override
	public File createSubDirForUploadFileTempDir( int userId, long uploadKey, File uploadTempBase ) throws LimelightWebappFileUploadFileSystemException, IOException {
		File subdir = getSubDirForUploadFileTempDir( userId, uploadKey, uploadTempBase );
		if ( subdir.exists() ) {
			//  Subdir already exists so need new uploadKey to create unique subdir
			return null;
		}
		if ( ! subdir.mkdir() ) {
			String msg = "Failed to make temp upload subdir: " + subdir.getCanonicalPath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException( msg );
		}
		return subdir;
	}
	
	/**
	 * @param userId
	 * @param uploadKey
	 * @param uploadTempBase
	 * @return
	 * @throws LimelightWebappFileUploadFileSystemException 
	 * @throws IOException 
	 */
	@Override
	public File getSubDirForUploadFileTempDir( int userId, long uploadKey, File uploadTempBase ) throws LimelightWebappFileUploadFileSystemException, IOException {
		String subdirName = LimelightXMLFileUploadWebConstants.UPLOAD_FILE_TEMP_SUB_DIR_PREFIX 
				+ userId + "_" + uploadKey;
		File subdir = new File( uploadTempBase, subdirName );
		return subdir;
	}
	
	/**
	 * @param fileIndex
	 * @param uploadTempBase
	 * @return
	 */
	@Override
	public File getDataFile( int fileIndex, File uploadTempBase ) {
		String dataFileName = LimelightXMLFileUploadWebConstants.UPLOAD_FILE_DATA_FILE_PREFIX
				+ fileIndex
				+ LimelightXMLFileUploadWebConstants.UPLOAD_FILE_DATA_FILE_SUFFIX;
		File dataFile = new File( uploadTempBase, dataFileName );
		return dataFile;
	}
	
	/**
	 * @param fileIndex
	 * @param uploadTempBase
	 * @return
	 * @throws LimelightWebappFileUploadFileSystemException 
	 */
	@Override
	public File getUploadFile( String scanFileSuffix, int fileIndex, FileImportFileType fileType, File uploadTempBase ) throws LimelightWebappFileUploadFileSystemException {
		String uploadFilename = null;
		if ( fileType == FileImportFileType.LIMELIGHT_XML_FILE ) {
			uploadFilename = LimelightXMLFileUploadWebConstants.UPLOAD_LIMELIGHT_XML_FILE_TEMP_FILENAME_PREFIX
					+ fileIndex
					+ LimelightXMLFileUploadWebConstants.UPLOAD_LIMELIGHT_XML_FILE_TEMP_FILENAME_SUFFIX;
		} else if ( fileType == FileImportFileType.FASTA_FILE ) {
			uploadFilename = LimelightXMLFileUploadWebConstants.UPLOAD_FASTA_FILE_TEMP_FILENAME_PREFIX
					+ fileIndex;
		} else if ( fileType == FileImportFileType.SCAN_FILE ) {
			uploadFilename = LimelightXMLFileUploadWebConstants.UPLOAD_SCAN_FILE_TEMP_FILENAME_PREFIX
					+ fileIndex + scanFileSuffix;
		} else {
			String msg = "getUploadFile(...): Unknown value for fileType: " + fileType;
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException( msg );
		}
		File uploadFile = new File( uploadTempBase, uploadFilename );
		return uploadFile;
	}

}
