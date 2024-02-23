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
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.AnnotationValueStringLocalFieldLengthConstants;
import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_DescriptiveAnnotation_LargeValue_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_DescriptiveAnnotation_DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.AnnotationValueLocation;

/**
 * Table srch__protein_descriptive_annotation_tbl
 * 
 * Insert ONLY
 *
 */
public class DB_Insert_Search_Protein_DescriptiveAnnotation_InsertOnly_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Search_Protein_DescriptiveAnnotation_InsertOnly_DAO.class );

	private DB_Insert_Search_Protein_DescriptiveAnnotation_InsertOnly_DAO() { }
	public static DB_Insert_Search_Protein_DescriptiveAnnotation_InsertOnly_DAO getInstance() { return new DB_Insert_Search_Protein_DescriptiveAnnotation_InsertOnly_DAO(); }

	/**
	 * This will INSERT the given Search_Protein_DescriptiveAnnotationDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<Search_Protein_DescriptiveAnnotation_DTO> itemList ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();
			
			insert_NOT_Update_ID_Property_InDTOParams( itemList, dbConnection );

		} finally {
		}
	}

	private final static String INSERT_SQL = 
			"INSERT INTO srch__protein_descriptive_annotation_tbl "
			
			+ "( id, search_id, protein_sequence_version_id, "
			+ 	" annotation_type_id, value_location, value_string ) "
			
			+ "VALUES ";
	
	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL = "(?, ?, ?, ?, ?, ?)";

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
	 * This will INSERT the given Search_Protein_AnnotationDTO into the database
	 * @param itemList
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<Search_Protein_DescriptiveAnnotation_DTO> itemList, Connection dbConnection ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}
		
		List<Search_Protein_DescriptiveAnnotation_LargeValue_DTO> search_Protein_DescriptiveAnnotation_LargeValue_DTO_List = new ArrayList<>();
		
		final String insertSQL = this.create_insert_SQL( itemList.size() );
				
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {
			
			int counter = 0;
			
			for ( Search_Protein_DescriptiveAnnotation_DTO item : itemList ) {

				AnnotationValueLocation annotationValueLocation = AnnotationValueLocation.LOCAL;

				if ( item.getValueString().length() > AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH ) {
					annotationValueLocation = AnnotationValueLocation.LARGE_VALUE_TABLE;
				}

				counter++;
				pstmt.setLong( counter, item.getId() );
				counter++;
				pstmt.setInt( counter, item.getSearchId() );
				counter++;
				pstmt.setInt( counter, item.getProteinSequenceVersionId() );
				counter++;
				pstmt.setInt( counter, item.getAnnotationTypeId() );

				counter++;
				pstmt.setString( counter, annotationValueLocation.value() );

				counter++;
				if ( annotationValueLocation == AnnotationValueLocation.LOCAL ) {
					pstmt.setString( counter, item.getValueString() );
				} else {

					pstmt.setString( counter, "" ); // store empty string since value stored in .._large_value table
				}	

				if ( annotationValueLocation == AnnotationValueLocation.LARGE_VALUE_TABLE ) {

					Search_Protein_DescriptiveAnnotation_LargeValue_DTO search_Protein_DescriptiveAnnotation_LargeValue_DTO = new Search_Protein_DescriptiveAnnotation_LargeValue_DTO();
					search_Protein_DescriptiveAnnotation_LargeValue_DTO.setSrchProteinDescriptiveAnnotationId( item.getId() );
					search_Protein_DescriptiveAnnotation_LargeValue_DTO.setValueString( item.getValueString() );
					
					search_Protein_DescriptiveAnnotation_LargeValue_DTO_List.add( search_Protein_DescriptiveAnnotation_LargeValue_DTO );
				}
			}
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: insertSQL: " + insertSQL + "\n First Data to save: " + itemList.get(0), e );
			throw e;
		} 

		for ( Search_Protein_DescriptiveAnnotation_LargeValue_DTO search_Protein_DescriptiveAnnotation_LargeValue_DTO : search_Protein_DescriptiveAnnotation_LargeValue_DTO_List ) {
			
			DB_Insert_Search_Protein_DescriptiveAnnotationLargeValue_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object(search_Protein_DescriptiveAnnotation_LargeValue_DTO);
		}
	}
	
}
