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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;

/**
 * @author danj
 *
 */
public interface FileImportTrackingSingleFileDAO_IF {

	/**
	 * @param id
	 * @return 
	 * @throws Exception
	 */
	FileImportTrackingSingleFileDTO getForId(int id) throws Exception;

	/**
	 * @param trackingId
	 * @return 
	 * @throws Exception
	 */
	List<FileImportTrackingSingleFileDTO> getForTrackingId(int trackingId) throws Exception;

	/**
	 * @param trackingId
	 * @return
	 * @throws Exception
	 */
	List<FileImportTrackingSingleFileDTO> getFor_TrackingId( int trackingId ) throws Exception;
	
	/**
	 * @param trackingId
	 * @param fileIndex
	 * @return
	 * @throws Exception
	 */
	List<FileImportTrackingSingleFileDTO> getFor_TrackingId_FileIndex( int trackingId, int fileIndex ) throws Exception;
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	FileImportTrackingSingleFileDTO populateResultObject(ResultSet rs) throws SQLException;

	/**
	 * @param item
	 */
	void save( FileImportTrackingSingleFileDTO item );
	
	/**
	 * @param fileUploadStatus
	 * @param id
	 */
	public void update_file_upload_status_id_For_Id( ImportSingleFileUploadStatus fileUploadStatus, int id );
	
	/**
	 * @param id
	 */
	void delete_For_Id( int id );
}