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
public class PsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffsSearcher extends Limelight_JDBC_Base implements PsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffsSearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( PsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffsSearcher.class );
	
	/**
	 * 
	 *
	 */
	public static class PsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffsSearcher_ResultItem {
		
		int numPsms;
		int searchSubGroupId;
		
		public int getNumPsms() {
			return numPsms;
		}
		public int getSearchSubGroupId() {
			return searchSubGroupId;
		}
	}
	
	/**
	 * @param reportedPeptideId
	 * @param searchId
	 * @param searchSubGroupIds - to filter on.  Can be null or empty which means don't filter on them at all
	 * @param searcherCutoffValuesSearchLevel
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<PsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffsSearcher_ResultItem> 
	
	getPsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffs(
			
			int reportedPeptideId, int searchId, List<Integer> searchSubGroupIds, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {
		
		List<PsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffsSearcher_ResultItem> results = new ArrayList<>();
		
		
		//  Create reversed version of list
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList_Reversed = 
				new ArrayList<>( searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList() );
		
		Collections.reverse(psmCutoffValuesList_Reversed);
		
		//  Generate nested sub selects for each annotation type filtering on,
		//     with a innermost subselect of PSM Ids for search id / reported peptide id
				
				
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( "SELECT search_sub_group_id, COUNT(*) AS count FROM  " ); 
		
			
		//  generate sub-selects from outer most to inner most 

		for ( int counter = 0; counter < psmCutoffValuesList_Reversed.size(); counter++ ) {

			sqlSB.append( " ( SELECT psm_filterable_annotation_tbl.psm_id FROM psm_filterable_annotation_tbl INNER JOIN " );
		}

		//  Add innermost subselect on psm_tbl to get psm ids

		if ( searchSubGroupIds == null || searchSubGroupIds.isEmpty() ) {

			sqlSB.append( " ( SELECT id AS psm_id FROM psm_tbl WHERE search_id = ? AND reported_peptide_id = ? ) " );
		} else {

			//  Initial filter on searchSubGroupIds input param

			sqlSB.append( " ( SELECT psm_tbl.id AS psm_id FROM psm_tbl INNER JOIN psm_search_sub_group_tbl ON psm_tbl.id = psm_search_sub_group_tbl.psm_id " );
			sqlSB.append( " WHERE psm_tbl.search_id = ? AND psm_tbl.reported_peptide_id = ? AND psm_search_sub_group_tbl.search_sub_group_id IN ( " );

			for ( int counter = 0; counter < searchSubGroupIds.size(); counter++ ) {
				if ( counter != 0 ) {
					sqlSB.append( "," );
				}
				sqlSB.append( "?" );
			}
			sqlSB.append( " ) ) " );
		}

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
		sqlSB.append( "  as psm_ids INNER JOIN psm_search_sub_group_tbl ON psm_ids.psm_id = psm_search_sub_group_tbl.psm_id " );
		sqlSB.append( " GROUP BY psm_search_sub_group_tbl.search_sub_group_id " );

		
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			//  psm_tbl fields
			counter++;
			preparedStatement.setInt( counter, searchId );
			counter++;
			preparedStatement.setInt( counter, reportedPeptideId );

			if ( searchSubGroupIds != null && ( ! searchSubGroupIds.isEmpty() ) ) {
				for ( Integer searchSubGroupId : searchSubGroupIds ) {
					counter++;
					preparedStatement.setInt( counter, searchSubGroupId );
				}
			}
			
			if ( ! psmCutoffValuesList_Reversed.isEmpty() ) {
				
				//  Close sub-selects from inner most to outer most 
				for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList_Reversed ) {
					counter++;
					preparedStatement.setInt( counter, entry.getAnnotationTypeDTO().getId() );
					counter++;
					preparedStatement.setDouble( counter, entry.getAnnotationCutoffValue() );
				}
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					PsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffsSearcher_ResultItem result = new PsmCountSearchSubGroupsForSearchIdReportedPeptideIdSearchSubGroupIdsCutoffsSearcher_ResultItem();
					result.searchSubGroupId = rs.getInt( "search_sub_group_id" );
					result.numPsms = rs.getInt( "count" );
					results.add( result );
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR getting psm count:  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR getting psm count:  SQL: " + sql, e );
			throw e;
		}
		
		return results;		
	}

}
