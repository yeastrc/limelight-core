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
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntryDTO;

/**
 * table feature_detection_persistent_feature_entry_tbl 
 * 
 * INSERT ONLY in this class
 *
 */
public class FeatureDetectionPersistentFeatureEntry_InsertONLY_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionPersistentFeatureEntry_InsertONLY_DAO.class );
	
	private FeatureDetectionPersistentFeatureEntry_InsertONLY_DAO() { }
	public static FeatureDetectionPersistentFeatureEntry_InsertONLY_DAO getInstance() { return new FeatureDetectionPersistentFeatureEntry_InsertONLY_DAO(); }

	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO feature_detection_persistent_feature_entry_tbl "
					+ " ( "
					+ " id, feature_detection_root_id, feature_detection_persistent_feature_uploaded_file_stats_id, "
					+ " monoisotopic_mass, charge, "
					+ " retention_time_range_start, retention_time_range_end, retention_time_range_apex, "
					+ " abundance_retention_time_range_apex, abundance_total "
					+ " ) "
					+ " VALUES ";
	
	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL = " ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
	
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
	public void insert_NOT_Update_ID_Property_InDTOParams( List<FeatureDetectionPersistentFeatureEntryDTO> itemList ) throws Exception {
		
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
	public void insert_NOT_Update_ID_Property_InDTOParams( List<FeatureDetectionPersistentFeatureEntryDTO> itemList, Connection dbConnection ) throws Exception {
		
		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}
		
		final String insertSQL = this.create_insert_SQL( itemList.size() );

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {

			int counter = 0;

			for ( FeatureDetectionPersistentFeatureEntryDTO item : itemList ) {

				counter++;
				pstmt.setInt( counter, item.getId() );
				counter++;
				pstmt.setInt( counter, item.getFeatureDetectionRootId() );
				counter++;
				pstmt.setInt( counter, item.getFeatureDetectionPersistentFeatureUploadedFileStatsId() );
				counter++;
				pstmt.setDouble( counter, item.getMonoisotopicMass() );
				counter++;
				pstmt.setInt( counter, item.getCharge() );
				counter++;
				pstmt.setFloat( counter, item.getRetentionTimeRange_Start() );
				counter++;
				pstmt.setFloat( counter, item.getRetentionTimeRange_End() );
				counter++;
				pstmt.setFloat( counter, item.getRetentionTimeRange_Apex() );
				counter++;
				pstmt.setDouble( counter, item.getAbundance_RetentionTimeRange_Apex() );
				counter++;
				pstmt.setDouble( counter, item.getAbundance_Total() );
			}

			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			String msg = "Insert Fail: first item to save: " + itemList.get(0) + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}

}
