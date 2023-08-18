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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionSingularFeatureEntryMods_DTO;

/**
 * table feature_detection_singular_feature_entry_tbl - Insert
 * 
 * !!!  WARNING:  the 'id' property is NOT updated 
 *
 */
public class FeatureDetectionSingularFeatureEntryMods_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionSingularFeatureEntryMods_DAO.class );

	public static final int DEFAULT_INSERT_ENTRIES_ARRAY_SIZE = 2000;

	
	private FeatureDetectionSingularFeatureEntryMods_DAO() { }
	public static FeatureDetectionSingularFeatureEntryMods_DAO getInstance() { return new FeatureDetectionSingularFeatureEntryMods_DAO(); }


	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO feature_detection_singular_feature_entry_mods_tbl "
			+ " ( "
			+ " feature_detection_singular_feature_entry_id, modification_field "
			+ " ) "
			+ "VALUES ";

	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL = "( ?, ? )";

	private volatile String insert_SQL__For_DefaultInsertEntriesSize;

	/**
	 * @param entryCount
	 * @return
	 */
	private String create_insert_SQL( int entryCount ) {
		
		StringBuilder sqlSB = new StringBuilder( INSERT_SQL.length() + ( ( INSERT_VALUES_SINGLE_ENTRY_SQL.length() + 5 ) * DEFAULT_INSERT_ENTRIES_ARRAY_SIZE ) );

		sqlSB.append( INSERT_SQL );
		
		for ( int counter = 1; counter <= entryCount; counter++ ) {
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( INSERT_VALUES_SINGLE_ENTRY_SQL );
		}
		
		return sqlSB.toString();
	}
	

	/**
	 * @param itemList
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<FeatureDetectionSingularFeatureEntryMods_DTO> itemList ) throws Exception {
		
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
public void insert_NOT_Update_ID_Property_InDTOParams( List<FeatureDetectionSingularFeatureEntryMods_DTO> itemList, Connection dbConnection ) throws Exception {

	if ( itemList.isEmpty() ) {
		throw new IllegalArgumentException( "( itemList.isEmpty() )" );
	}

	String insertSQL_Local = null;
	
	if ( itemList.size() == DEFAULT_INSERT_ENTRIES_ARRAY_SIZE ) {
		
		if ( this.insert_SQL__For_DefaultInsertEntriesSize == null ) {

			this.insert_SQL__For_DefaultInsertEntriesSize = this.create_insert_SQL(DEFAULT_INSERT_ENTRIES_ARRAY_SIZE);
		}
		
		insertSQL_Local = this.insert_SQL__For_DefaultInsertEntriesSize;
	} else {
		
		insertSQL_Local = this.create_insert_SQL( itemList.size() );
	}
	
	final String insertSQL = insertSQL_Local;

	try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {

			int counter = 0;

			for ( FeatureDetectionSingularFeatureEntryMods_DTO item : itemList ) {
				counter++;
				pstmt.setInt( counter, item.getFeatureDetectionSingularFeatureEntryId() );
				counter++;
				pstmt.setString( counter, item.getModificationField() );
			}
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + insertSQL + "\n first item to save: : " + itemList.get(0), e );
			throw e;
		}
	}
		
}
