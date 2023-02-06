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
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO;

/**
 * table feature_detection_persistent_feature_entry_ms_2_scan_number_tbl
 *
 */
public class FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDAO {
	
	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDAO.class );
	
	private FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDAO() { }
	public static FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDAO getInstance() { return new FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDAO(); }

	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO feature_detection_persistent_feature_entry_ms_2_scan_number_tbl "
					+ " ( "
					+ " feature_detection_persistent_feature_entry_id, "
					+ " ms_2_scan_number "
					+ " ) "
					+ "VALUES ( ?, ? )";
	
	/**
	 * @param itemList
	 * @throws Exception
	 */
	public void save( FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO item ) throws Exception {
		
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
	public void save( FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO item, Connection dbConnection ) throws Exception {

		final String insertSQL = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {

			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getFeatureDetectionPersistentFeatureEntryId() );
			counter++;
			pstmt.setInt( counter, item.getMs_2_ScanNumber() );

			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			String msg = "Insert Fail: item: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}

}
