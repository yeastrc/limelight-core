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
package org.yeastrc.limelight.limelight_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSONBlob_DTO;

/**
 * table file_import_tracking_data_json_blob_tbl
 *
 */
public class FileImportTrackingDataJSONBlob_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingDataJSONBlob_DAO_Importer.class );
	
	private FileImportTrackingDataJSONBlob_DAO_Importer() { }
	public static FileImportTrackingDataJSONBlob_DAO_Importer getInstance() { return new FileImportTrackingDataJSONBlob_DAO_Importer(); }
	

	/**
	 * @param trackingId
	 * @return 
	 * @throws Exception
	 */
	public FileImportTrackingDataJSONBlob_DTO getForTrackingId( int trackingId ) throws Exception {
		
		FileImportTrackingDataJSONBlob_DTO result = null;
		
		final String sql = "SELECT json_contents_format_version, json_contents FROM file_import_tracking_data_json_blob_tbl WHERE file_import_tracking_id = ?";

		try ( Connection connection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, trackingId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new FileImportTrackingDataJSONBlob_DTO();
					result.setFileImportTrackingId( trackingId );
					result.setJsonContents_FormatVersion( rs.getInt( "json_contents_format_version" ) );
					result.setJsonContents( rs.getString( "json_contents" ) );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingDataJSONBlob_DTO, id: " + trackingId + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return result;
	}
	
}
