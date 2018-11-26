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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table annotation_type_tbl
 *
 */
@Component
public class AnnotationTypeDAO extends Limelight_JDBC_Base implements AnnotationTypeDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( AnnotationTypeDAO.class );
	
	@Autowired
	private AnnotationTypeFilterableDAO_IF annotationTypeFilterableDAO;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.AnnotationTypeDAO_IF#getForId(int)
	 */
	@Override
	public AnnotationTypeDTO getForId( int id ) throws SQLException {
		
		AnnotationTypeDTO result = null;
		
		final String querySQL = "SELECT * FROM annotation_type_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateFromResultSet( rs );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.AnnotationTypeDAO_IF#populateFromResultSet(java.sql.ResultSet)
	 */
	@Override
	public AnnotationTypeDTO populateFromResultSet(	ResultSet rs) throws SQLException {
		
		
		AnnotationTypeDTO item;
		item = new AnnotationTypeDTO();
		
		item.setId( rs.getInt( "id" ) );
		item.setSearchId( rs.getInt( "search_id" ) );
		item.setSearchProgramsPerSearchId( rs.getInt( "search_programs_per_search_id" ) );
		
		String psmPeptideMatchedProteinAnnotationTypeString = rs.getString( "psm_peptide_protein_type" );
		PsmPeptideMatchedProteinAnnotationType psmPeptideAnnotationType = PsmPeptideMatchedProteinAnnotationType.fromValue( psmPeptideMatchedProteinAnnotationTypeString );
		item.setPsmPeptideMatchedProteinAnnotationType( psmPeptideAnnotationType );

		String filterableDescriptiveAnnotationTypeString = rs.getString( "filterable_descriptive_type" );
		FilterableDescriptiveAnnotationType filterableDescriptiveAnnotationType = FilterableDescriptiveAnnotationType.fromValue( filterableDescriptiveAnnotationTypeString );
		item.setFilterableDescriptiveAnnotationType( filterableDescriptiveAnnotationType );


		item.setName( rs.getString( "name" ) );

		int defaultVisibleInt = rs.getInt( "default_visible" );
		
		if ( Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE == defaultVisibleInt ) {
			item.setDefaultVisible( false );
		} else {
			item.setDefaultVisible( true );
		}

		int displayOrder = rs.getInt( "display_order" );
		if ( ! rs.wasNull() ) {
			
			item.setDisplayOrder( displayOrder );
		}

		item.setDescription( rs.getString( "description" ) );
		
		if ( item.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.FILTERABLE ) {
			
			AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationTypeFilterableDAO.getForAnnotationTypeId( item.getId() );
			
			if ( annotationTypeFilterableDTO == null ) {
				String msg = "AnnotationTypeFilterableDTO record not found for annotation type FILTERABLE. annotation type id: " + item.getId();
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}

			item.setAnnotationTypeFilterableDTO(annotationTypeFilterableDTO);
		}
		
		return item;
	}
}
