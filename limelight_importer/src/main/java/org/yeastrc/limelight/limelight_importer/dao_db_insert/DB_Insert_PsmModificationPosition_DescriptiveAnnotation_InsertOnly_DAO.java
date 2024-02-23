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
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionDescriptiveAnnotation_LargeValue_DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.AnnotationValueLocation;

/**
 * Table psm_modification_position_descriptive_annotation_tbl
 *
 */
public class DB_Insert_PsmModificationPosition_DescriptiveAnnotation_InsertOnly_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmModificationPosition_DescriptiveAnnotation_InsertOnly_DAO.class );

	private DB_Insert_PsmModificationPosition_DescriptiveAnnotation_InsertOnly_DAO() { }
	public static DB_Insert_PsmModificationPosition_DescriptiveAnnotation_InsertOnly_DAO getInstance() { return new DB_Insert_PsmModificationPosition_DescriptiveAnnotation_InsertOnly_DAO(); }

	/**
	 * This will INSERT the given PsmModificationPosition_DescriptiveAnnotationDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<PsmModificationPositionDescriptiveAnnotationDTO> itemList ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();
			
			insert_NOT_Update_ID_Property_InDTOParams( itemList, dbConnection );

		} finally {
		}
	}

	private final static String INSERT_SQL = 
			"INSERT INTO psm_modification_position_descriptive_annotation_tbl "
			
			+ "( id, psm_id, srch_rep_pept__dynamic_mod_id, "
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
	 * This will INSERT the given PsmAnnotationDTO into the database
	 * @param item
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<PsmModificationPositionDescriptiveAnnotationDTO> itemList, Connection dbConnection ) throws Exception {


		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}
		
		List<PsmModificationPositionDescriptiveAnnotation_LargeValue_DTO> psmDescriptiveAnnotation_LargeValue_DTO_List = new ArrayList<>();
		
		final String insertSQL = this.create_insert_SQL( itemList.size() );
		
		try {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {

				int counter = 0;

				for ( PsmModificationPositionDescriptiveAnnotationDTO item : itemList ) {

					AnnotationValueLocation annotationValueLocation = AnnotationValueLocation.LOCAL;

					if ( item.getValueString().length() > AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH ) {
						annotationValueLocation = AnnotationValueLocation.LARGE_VALUE_TABLE;
					}

					counter++;
					pstmt.setLong( counter, item.getId() );
					counter++;
					pstmt.setLong( counter, item.getPsmId() );
					counter++;
					pstmt.setInt( counter, item.getSearch_ReportedPeptide_DynamicMod_Id() );
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
						
						PsmModificationPositionDescriptiveAnnotation_LargeValue_DTO psmDescriptiveAnnotation_LargeValue_DTO = new PsmModificationPositionDescriptiveAnnotation_LargeValue_DTO();
						psmDescriptiveAnnotation_LargeValue_DTO.setPsmModificationPositionDescriptiveAnnotationDTO( item.getId() );
						psmDescriptiveAnnotation_LargeValue_DTO.setValueString( item.getValueString() );
						
						psmDescriptiveAnnotation_LargeValue_DTO_List.add(psmDescriptiveAnnotation_LargeValue_DTO);
					}
				}

				pstmt.executeUpdate();
				
				for ( PsmModificationPositionDescriptiveAnnotation_LargeValue_DTO psmDescriptiveAnnotation_LargeValue_DTO : psmDescriptiveAnnotation_LargeValue_DTO_List ) {
					
					DB_Insert_PsmModificationPosition_DescriptiveAnnotationLargeValue_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object(psmDescriptiveAnnotation_LargeValue_DTO);
				}
			}


		} catch ( Exception e ) {
			log.error( "ERROR: insertSQL: " + insertSQL + "\n First to save: " + itemList.get(0), e );
			throw e;
		} finally {
			
		}
	}
	
	
}
