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
package org.yeastrc.limelight.limelight_feature_detection_run_import.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeature_FileHeaderContents_DTO;

/**
 * table feature_detection_persistent_feature_file_header_contents_tbl
 *
 */
public class FeatureDetectionPersistentFeature_FileHeaderContents_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionPersistentFeature_FileHeaderContents_DAO.class );
	
	private FeatureDetectionPersistentFeature_FileHeaderContents_DAO() { }
	public static FeatureDetectionPersistentFeature_FileHeaderContents_DAO getInstance() { return new FeatureDetectionPersistentFeature_FileHeaderContents_DAO(); }

	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO feature_detection_persistent_feature_file_header_contents_tbl "
			+ " ( "
			+ " feature_detection_persistent_feature_uploaded_file_stats_id, "
			+ " file_header_contents "
			+ " ) "
			+ "VALUES ( ?, ? )";

	/**
	 * @param itemList
	 * @throws Exception
	 */
	public void save( FeatureDetectionPersistentFeature_FileHeaderContents_DTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			//  Insert 
			save( item, dbConnection );
		}
	}

	/**
	 * @param itemList
	 * @param dbConnection
	 * @throws Exception
	 */
	public void save( FeatureDetectionPersistentFeature_FileHeaderContents_DTO item, Connection dbConnection ) throws Exception {

		final String insertSQL = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {

			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getFeatureDetectionPersistentFeatureUploadedFileStatsId() );
			counter++;
			pstmt.setString( counter, item.getFileHeaderContents() );

			pstmt.executeUpdate();
						
		} catch ( Exception e ) {
			String msg = "Insert Fail: item: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}
}
