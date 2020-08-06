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
import java.util.Collections;
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
public class PsmCountForSearchIdReportedPeptideIdCutoffsSearcher extends Limelight_JDBC_Base implements PsmCountForSearchIdReportedPeptideIdCutoffsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PsmCountForSearchIdReportedPeptideIdCutoffsSearcher.class );
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmCountForSearchIdReportedPeptideIdSearcherIF#getPsmCountForSearchIdReportedPeptideId(int, int, org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public int getPsmCountForSearchIdReportedPeptideIdCutoffs(
			
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {
		
		int numPsms = 0;
		
		//  Create reversed version of list
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList_Reversed = 
				new ArrayList<>( searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList() );
		
		Collections.reverse(psmCutoffValuesList_Reversed);
		
		//  Generate nested sub selects for each annotation type filtering on,
		//     with a innermost subselect of PSM Ids for search id / reported peptide id
				
				
		StringBuilder sqlSB = new StringBuilder( 10000 );
		sqlSB.append( "SELECT COUNT(*) AS count FROM  " ); 
		if ( psmCutoffValuesList_Reversed.isEmpty() ) {
			sqlSB.append( " psm_tbl WHERE search_id = ? AND reported_peptide_id = ? " );
		} else {
			
			//  generate sub-selects from outer most to inner most 
	
			for ( int counter = 0; counter < psmCutoffValuesList_Reversed.size(); counter++ ) {

				sqlSB.append( " ( SELECT psm_filterable_annotation_tbl.psm_id FROM psm_filterable_annotation_tbl INNER JOIN " );
			}
			
			//  Add innermost subselect on psm_tbl to get psm ids
			
			sqlSB.append( " ( SELECT id AS psm_id FROM psm_tbl WHERE search_id = ? AND reported_peptide_id = ? ) " );

			//  Close sub-selects from inner most to outer most 
	
			for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList_Reversed ) {

				sqlSB.append( " as psm_ids ON psm_filterable_annotation_tbl.psm_id = psm_ids.psm_id " );
				sqlSB.append( " WHERE annotation_type_id = ? AND " );
				sqlSB.append( " value_double " );
				if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO() == null ) {
					String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
				} else if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
				} else {
					String msg = "ERROR: entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() is unknown value: "
							+ entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum()
							+ ".  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				sqlSB.append( " ? )  " );
			}
			sqlSB.append( "  as psm_ids " );
			
		}
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			if ( psmCutoffValuesList_Reversed.isEmpty() ) {
				//  psm_tbl fields
				counter++;
				preparedStatement.setInt( counter, searchId );
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			} else {
				//  psm_tbl fields
				counter++;
				preparedStatement.setInt( counter, searchId );
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
				
				//  Close sub-selects from inner most to outer most 
				for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList_Reversed ) {
					counter++;
					preparedStatement.setInt( counter, entry.getAnnotationTypeDTO().getId() );
					counter++;
					preparedStatement.setDouble( counter, entry.getAnnotationCutoffValue() );
				}
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					numPsms = rs.getInt( "count" );
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR getting psm count:  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR getting psm count:  SQL: " + sql, e );
			throw e;
		}
		return numPsms;		
	}

}
