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
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;

/**
 * Table annotation_type_tbl
 *
 */
public class AnnotationTypeDAO {
	
	private static final Logger log = LoggerFactory.getLogger( AnnotationTypeDAO.class );

	private AnnotationTypeDAO() { }
	public static AnnotationTypeDAO getInstance() { return new AnnotationTypeDAO(); }
	
	/**
	 * This will INSERT the given AnnotationTypeDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( AnnotationTypeDTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			saveToDatabase( item, dbConnection );
		}
	}

	private final static String INSERT_SQL = 
			"INSERT INTO annotation_type_tbl "
			
			+ "( search_id, search_programs_per_search_id, "
			+ 	" psm_peptide_protein_type, filterable_descriptive_type, "
			+ 	" name, default_visible, display_order, description ) "
			
			+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )";
		
	/**
	 * This will INSERT the given AnnotationTypeDTO into the database
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( AnnotationTypeDTO item, Connection dbConnection ) throws Exception {
		
		if ( log.isDebugEnabled() ) {
			log.debug( "Saving AnnotationTypeDTO item: " + item );
		}

		if ( item.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.FILTERABLE ) {
			
			AnnotationTypeFilterableDTO annotationTypeFilterableDTO = item.getAnnotationTypeFilterableDTO();
			
			if ( annotationTypeFilterableDTO == null ) {
				String msg = "ERROR: annotationTypeFilterableDTO not populated for annotation type FILTERABLE. annotation name: " + item.getName();
				log.error( msg );
				throw new IllegalArgumentException(msg);
			}
		} else {
			AnnotationTypeFilterableDTO annotationTypeFilterableDTO = item.getAnnotationTypeFilterableDTO();
			
			if ( annotationTypeFilterableDTO != null ) {

				String msg = "ERROR: annotationTypeFilterableDTO populated for annotation type NOT FILTERABLE. annotation name: " + item.getName();
				log.error( msg );
				throw new IllegalArgumentException(msg);
			}
		}

		final String sql = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			
			int counter = 0;

			if ( item.getPsmPeptideMatchedProteinAnnotationType() == null ) {
				
				String msg = "item.getPsmPeptideMatchedProteinAnnotationType() cannot be null";
				log.error( msg );
				throw new IllegalArgumentException(msg);
			}
			if ( item.getFilterableDescriptiveAnnotationType() == null ) {
				
				String msg = "item.getFilterableDescriptiveAnnotationType() cannot be null";
				log.error( msg );
				throw new IllegalArgumentException(msg);
			}

			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getSearchProgramsPerSearchId() );

			counter++;
			pstmt.setString( counter, item.getPsmPeptideMatchedProteinAnnotationType().value() );
			
			counter++;
			pstmt.setString( counter, item.getFilterableDescriptiveAnnotationType().value() );
			
			counter++;
			pstmt.setString( counter, item.getName() );
			
			counter++;
			if ( item.isDefaultVisible() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}

			counter++;
			if ( item.getDisplayOrder() != null ) {
				pstmt.setInt( counter, item.getDisplayOrder() );
			} else {
				pstmt.setNull( counter, java.sql.Types.INTEGER );
			}

			
			counter++;
			pstmt.setString( counter, item.getDescription() );
			
			
			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert for " + item.getDescription() );
			}			
			

			if ( item.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.FILTERABLE ) {
				
				AnnotationTypeFilterableDTO annotationTypeFilterableDTO = item.getAnnotationTypeFilterableDTO();
				annotationTypeFilterableDTO.setAnnotationTypeId( item.getId() );
				
				AnnotationTypeFilterableDAO.getInstance().saveToDatabase( annotationTypeFilterableDTO, dbConnection );
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql, e );
			throw e;
		}
		
		
	}
	
}
