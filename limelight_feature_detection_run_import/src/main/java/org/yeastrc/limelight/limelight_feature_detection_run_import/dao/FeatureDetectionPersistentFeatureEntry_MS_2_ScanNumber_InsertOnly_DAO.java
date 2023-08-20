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
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO;

/**
 * table feature_detection_persistent_feature_entry_ms_2_scan_number_tbl
 *
 */
public class FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumber_InsertOnly_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumber_InsertOnly_DAO.class );
	
	private FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumber_InsertOnly_DAO() { }
	public static FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumber_InsertOnly_DAO getInstance() { return new FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumber_InsertOnly_DAO(); }

	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO feature_detection_persistent_feature_entry_ms_2_scan_number_tbl "
					+ " ( "
					+ " feature_detection_persistent_feature_entry_id, "
					+ " ms_2_scan_number "
					+ " ) "
					+ "VALUES ";
					
	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL = "( ?, ? )";

	private ConcurrentMap<Integer, String> insertSQL_Map_Key_StringLength = new ConcurrentHashMap<>();

	/**
	 * @param entryCount
	 * @return
	 */
	private String create_insert_SQL( int entryCount ) {
		
		String sql = insertSQL_Map_Key_StringLength.get( entryCount );
		
		if ( sql != null ) {
			return sql;
		}
		
		StringBuilder sqlSB = new StringBuilder( INSERT_SQL.length() + ( ( INSERT_VALUES_SINGLE_ENTRY_SQL.length() + 5 ) * entryCount ) );

		sqlSB.append( INSERT_SQL );
		
		for ( int counter = 1; counter <= entryCount; counter++ ) {
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( INSERT_VALUES_SINGLE_ENTRY_SQL );
		}
		
		sql = sqlSB.toString();
		
		insertSQL_Map_Key_StringLength.put( entryCount, sql );
		
		return sql;
	}
	
	/**
	 * @param itemList
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO> itemList ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			//  Insert 
			insert_NOT_Update_ID_Property_InDTOParams( itemList, dbConnection );
		}
	}

	/**
	 * @param itemList
	 * @param dbConnection
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO> itemList, Connection dbConnection ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}
		
		final String insertSQL = this.create_insert_SQL( itemList.size() );

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {

			int counter = 0;
			
			for ( FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO item : itemList ) {
			
				counter++;
				pstmt.setInt( counter, item.getFeatureDetectionPersistentFeatureEntryId() );
				counter++;
				pstmt.setInt( counter, item.getMs_2_ScanNumber() );
			}

			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			String msg = "Insert Fail: first item to save: " + itemList.get(0) + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}

}
