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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.SearcherGeneralConstants;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 *
 */
@Component
public class PsmIdsForSearchIdReportedPeptideIdCutoffsSearcher extends Limelight_JDBC_Base implements PsmIdsForSearchIdReportedPeptideIdCutoffsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PsmIdsForSearchIdReportedPeptideIdCutoffsSearcher.class );
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmIdsForSearchIdReportedPeptideIdCutoffsSearcherIF#getPsmIdsForSearchIdReportedPeptideIdCutoffs(int, int, org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public List<Long> getPsmIdsForSearchIdReportedPeptideIdCutoffs(
			
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {
		
		List<Long> psmIds = new ArrayList<>();
		
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList = 
				searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList();
		
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( "SELECT " );
		
		if ( psmCutoffValuesList.isEmpty() ) {
			
			sqlSB.append( " psm_tbl.id AS psm_id " ); 
		} else {
			sqlSB.append( " tbl_1.psm_id AS psm_id " ); 
		}
		
		sqlSB.append( " FROM  " ); 
		
		if ( psmCutoffValuesList.isEmpty() ) {
			sqlSB.append( " psm_tbl WHERE search_id = ? AND reported_peptide_id = ? " );
		} else {
			{
				for ( int counter = 1; counter <= psmCutoffValuesList.size(); counter++ ) {
					if ( counter > 1 ) {
						sqlSB.append( " INNER JOIN " );
					}
					sqlSB.append( " psm_filterable_annotation__lookup_tbl AS tbl_" );
					sqlSB.append( Integer.toString( counter ) );
					if ( counter > 1 ) {
						sqlSB.append( " ON "  );
						sqlSB.append( "tbl_" );
						sqlSB.append( Integer.toString( counter - 1 ) );
						sqlSB.append( ".psm_id " );
						sqlSB.append( " = " );
						sqlSB.append( "tbl_" );
						sqlSB.append( Integer.toString( counter ) );
						sqlSB.append( ".psm_id" );
					}
				}
				sqlSB.append( " WHERE ( " );
				{
					int counter = 0; 
					for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList ) {
						counter++;
						if ( counter > 1 ) {
							sqlSB.append( " ) AND ( " );
						}
						sqlSB.append( "tbl_" );
						sqlSB.append( Integer.toString( counter ) );
						sqlSB.append( ".search_id = ? AND " );
						sqlSB.append( "tbl_" );
						sqlSB.append( Integer.toString( counter ) );
						sqlSB.append( ".reported_peptide_id = ? AND " );
						sqlSB.append( "tbl_" );
						sqlSB.append( Integer.toString( counter ) );
						sqlSB.append( ".annotation_type_id = ? AND " );
						sqlSB.append( "tbl_" );
						sqlSB.append( Integer.toString( counter ) );
						sqlSB.append( ".value_double " );
						if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO() == null ) {
							String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
							log.error( msg );
							throw new LimelightInternalErrorException(msg);
						}
						if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
							sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
						} else {
							sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
						}
						sqlSB.append( "? " );
					}
				}
			}
			sqlSB.append( " ) " );
		}
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			if ( psmCutoffValuesList.isEmpty() ) {
				counter++;
				preparedStatement.setInt( counter, searchId );
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			} else {
				for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList ) {
					counter++;
					preparedStatement.setInt( counter, searchId );
					counter++;
					preparedStatement.setInt( counter, reportedPeptideId );
					counter++;
					preparedStatement.setInt( counter, entry.getAnnotationTypeDTO().getId() );
					counter++;
					preparedStatement.setDouble( counter, entry.getAnnotationCutoffValue() );
				}
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					
					psmIds.add( rs.getLong( "psm_id" ) );
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		}
		return psmIds;		
	}

}
