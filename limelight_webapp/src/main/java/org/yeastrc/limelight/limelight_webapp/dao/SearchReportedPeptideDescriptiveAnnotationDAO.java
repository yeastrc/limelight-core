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
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.AnnotationValueLocation;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table srch__rep_pept_descriptive_annotation_tbl
 *
 */
@Component
public class SearchReportedPeptideDescriptiveAnnotationDAO extends Limelight_JDBC_Base implements SearchReportedPeptideDescriptiveAnnotationDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( SearchReportedPeptideDescriptiveAnnotationDAO.class );
	
	@Autowired
	private SearchReportedPeptideDescriptiveAnnotationLargeValueDAO_IF searchReportedPeptideDescriptiveAnnotationLargeValueDAO;
	
	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */

	@Override
	public SearchReportedPeptideDescriptiveAnnotationDTO getForId( int id ) throws SQLException {
		
		SearchReportedPeptideDescriptiveAnnotationDTO result = null;
		
		final String querySQL = "SELECT * FROM srch__rep_pept_descriptive_annotation_tbl WHERE id = ?";
		
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


	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	@Override
	public SearchReportedPeptideDescriptiveAnnotationDTO populateFromResultSet(	ResultSet rs) throws SQLException {
		
		
		SearchReportedPeptideDescriptiveAnnotationDTO item;
		item = new SearchReportedPeptideDescriptiveAnnotationDTO();
		
		item.setId( rs.getInt( "id" ) );
		item.setSearchId( rs.getInt( "search_id" ) );
		item.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );
		
		item.setAnnotationTypeId( rs.getInt( "annotation_type_id" ) );

		String locationValueString = rs.getString( "value_location" );
		
		AnnotationValueLocation annotationValueLocation = AnnotationValueLocation.fromValue( locationValueString );
		
		if ( annotationValueLocation == AnnotationValueLocation.LOCAL ) {
		
			item.setValueString( rs.getString( "value_string" ) );
			
		} else {
			
			String valueString =
					searchReportedPeptideDescriptiveAnnotationLargeValueDAO.getForSrchRepPeptDescAnnId( item.getId() );
			
			item.setValueString( valueString );
		}
		
		return item;
	}
}
