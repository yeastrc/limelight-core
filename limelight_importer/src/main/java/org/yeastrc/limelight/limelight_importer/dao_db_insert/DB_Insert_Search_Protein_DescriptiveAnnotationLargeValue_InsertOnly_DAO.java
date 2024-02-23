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
package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_DescriptiveAnnotation_LargeValue_DTO;
import org.slf4j.Logger;

/**
 * Table srch__protein_desc_ann_large_value_tbl
 *
 */
public class DB_Insert_Search_Protein_DescriptiveAnnotationLargeValue_InsertOnly_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Search_Protein_DescriptiveAnnotationLargeValue_InsertOnly_DAO.class );

	private DB_Insert_Search_Protein_DescriptiveAnnotationLargeValue_InsertOnly_DAO() { }
	public static DB_Insert_Search_Protein_DescriptiveAnnotationLargeValue_InsertOnly_DAO getInstance() { return new DB_Insert_Search_Protein_DescriptiveAnnotationLargeValue_InsertOnly_DAO(); }

	/**
	 * This will INSERT the given PsmDescriptiveAnnotationDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<Search_Protein_DescriptiveAnnotation_LargeValue_DTO> itemList ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();

			insert_NOT_Update_ID_Property_InDTOParams( itemList, dbConnection );

		} finally {
		}
	}
	
	private final static String INSERT_SQL = 
			"INSERT INTO srch__protein_desc_ann_large_value_tbl "
			
			+ "(srch__protein_descriptive_annotation_id, value_string ) "
			
			+ "VALUES";
			
	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL = " (?, ?)";

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
	 * This will INSERT the given data into the database
	 * @param srch_Protein_DescriptiveAnnotationId - long due to property also used for PSM
	 * @param valueString
	 * @param dbConnection
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<Search_Protein_DescriptiveAnnotation_LargeValue_DTO> itemList, Connection dbConnection ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}
		
		final String insertSQL = this.create_insert_SQL( itemList.size() );

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {
						
			int counter = 0;
			
			for ( Search_Protein_DescriptiveAnnotation_LargeValue_DTO item : itemList ) {

				counter++;
				pstmt.setLong( counter, item.getSrchProteinDescriptiveAnnotationId() );
				counter++;
				pstmt.setString( counter, item.getValueString() );
			}
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			
			log.error( "ERROR: insert_NOT_Update_ID_Property_InDTOParams(...) insertSQL: " + insertSQL
					+ ".  First Item: " + itemList.get(0), e );
			
			throw e;
		}
		
		
	}
}
