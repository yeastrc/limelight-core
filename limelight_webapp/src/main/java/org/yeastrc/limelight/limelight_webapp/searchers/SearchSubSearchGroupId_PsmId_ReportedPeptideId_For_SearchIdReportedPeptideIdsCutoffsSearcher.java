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
public class SearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffsSearcher extends Limelight_JDBC_Base implements SearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffsSearcher_IF   {

	private static final Logger log = LoggerFactory.getLogger( SearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffsSearcher.class );
	
	/**
	 * 
	 *
	 */
	public static class SearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffsSearcher_ResultItem {
		
		int searchSubGroupId;
		long psmId;
		int reportedPeptideId;
		
		public int getSearchSubGroupId() {
			return searchSubGroupId;
		}
		public long getPsmId() {
			return psmId;
		}
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
	}
	
	/**
	 * @param reportedPeptideIds
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<SearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffsSearcher_ResultItem> 
	
	getSearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffs(
			
			List<Integer> reportedPeptideIds, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {
		
		List<SearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffsSearcher_ResultItem> results = new ArrayList<>();
		
		
		//  Create reversed version of list
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList_Reversed = 
				new ArrayList<>( searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList() );
		
		Collections.reverse(psmCutoffValuesList_Reversed);
		
		//  Generate nested sub selects for each annotation type filtering on,
		//     with a innermost subselect of PSM Ids for search id / reported peptide id
				
				
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( "SELECT search_sub_group_id, psm_ids.psm_id, psm_ids.reported_peptide_id FROM  " ); 
		
		
		//  generate sub-selects from outer most to inner most 

		for ( int counter = 0; counter < psmCutoffValuesList_Reversed.size(); counter++ ) {

			sqlSB.append( " ( SELECT psm_filterable_annotation_tbl.psm_id, reported_peptide_id FROM psm_filterable_annotation_tbl INNER JOIN " );
		}

		//  Add innermost subselect on psm_tbl to get psm ids

		sqlSB.append( " ( SELECT id AS psm_id, reported_peptide_id FROM psm_tbl WHERE search_id = ? AND reported_peptide_id IN ( " );

		for ( int counter = 0; counter < reportedPeptideIds.size(); counter++ ) {
			if ( counter != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( " ) " ); //  close " reported_peptide_id IN ( "

		sqlSB.append( " ) " ); //  close " ( SELECT id AS psm_id, "


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

		
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			//  psm_tbl fields
			counter++;
			preparedStatement.setInt( counter, searchId );
			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
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
					SearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffsSearcher_ResultItem result = new SearchSubSearchGroupId_PsmId_ReportedPeptideId_For_SearchIdReportedPeptideIdsCutoffsSearcher_ResultItem();
					result.searchSubGroupId = rs.getInt( "search_sub_group_id" );
					result.psmId = rs.getLong( "psm_id" );
					result.reportedPeptideId = rs.getInt( "reported_peptide_id" );
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
