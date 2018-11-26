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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_webapp.dao.SearchReportedPeptideDescriptiveAnnotationDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get Reported Peptide Descriptive Annotation Data for Search Id, Reported Peptide Id, and ann type ids
 *
 */
@Component
public class SearchReportedPeptide_DescriptiveAnnotationData_Searcher extends Limelight_JDBC_Base implements SearchReportedPeptide_DescriptiveAnnotationData_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( SearchReportedPeptide_DescriptiveAnnotationData_Searcher.class );
	
	@Autowired
	private SearchReportedPeptideDescriptiveAnnotationDAO_IF searchReportedPeptideDescriptiveAnnotationDAO;

	private static final String SQL_MAIN = 
			"SELECT * "
			+ " FROM srch__rep_pept_descriptive_annotation_tbl  "
			+ " WHERE search_id = ? AND reported_peptide_id = ? AND annotation_type_id IN  ";
	
	/**
	 * @param searchId
	 * @param reportedPeptideId
	 * @param srchPgmFilterableReportedPeptideAnnotationTypeDTOList
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<SearchReportedPeptideDescriptiveAnnotationDTO> getSearchReportedPeptideDescriptiveAnnotationDTOList( int searchId, int reportedPeptideId, Collection<Integer> annotationTypeIds  ) throws Exception {
		
		List<SearchReportedPeptideDescriptiveAnnotationDTO> results = new ArrayList<>();
		if ( annotationTypeIds == null || annotationTypeIds.isEmpty() ) {
			return results;
		}
		StringBuilder sqlSB = new StringBuilder( 1000 );
		//////////////////////
		/////   Start building the SQL
		sqlSB.append( SQL_MAIN );
		//////////
		// Add type ids to  WHERE
		boolean first = true;
		sqlSB.append( " ( " );
		for ( Integer annotationTypeId : annotationTypeIds ) {
			if ( first ) {
				first = false;
			} else {
				sqlSB.append( ", " );
			}
			sqlSB.append( annotationTypeId );
		}
		sqlSB.append( " ) " );
		
		String querySQL = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, searchId );
			paramCounter++;
			preparedStatement.setInt( paramCounter, reportedPeptideId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					SearchReportedPeptideDescriptiveAnnotationDTO item = searchReportedPeptideDescriptiveAnnotationDAO.populateFromResultSet( rs );
					results.add( item );
				}
			}
		} catch ( Exception e ) {
			String msg = "Exception in getSearchReportedPeptideDescriptiveAnnotationDTOList( ... ): sql: " + querySQL;
			log.error( msg );
			throw e;
		}
		return results;
	}
}
