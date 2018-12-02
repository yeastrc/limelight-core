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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item;

/**
 * Best PSM values at Reported Peptide Level for Search Id and Reported Peptide Ids and Ann Type Ids 
 * 
 * Only retrieving reported_peptide_id, annotation_type_id, best_psm_value_for_ann_type_id
 */
@Component
public class PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher extends Limelight_JDBC_Base implements PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher.class );
	
	private final String SQL_MAIN = 
			"SELECT reported_peptide_id, annotation_type_id, best_psm_value_for_ann_type_id  "

			+ " FROM unified_rp__search__rep_pept__best_psm_value_lookup_tbl "

			+ " WHERE search_id = ? "
			;
	
	private final String SQL_ANN_TYPE_VALUES_START =
			" AND annotation_type_id IN ( ";

	private final String SQL_ANN_TYPE_VALUES_END =
			" ) ";

	private final String SQL_REPORTED_PEPTIDE_ID_VALUES_START =
			" AND reported_peptide_id IN ( ";

	private final String SQL_REPORTED_PEPTIDE_ID_VALUES_END =
			" ) ";
	
	/**
	 * Only retrieving reported_peptide_id, annotation_type_id, best_psm_value_for_ann_type_id
	 * 
	 * @param searchId
	 * @param reportedPeptideIds
	 * @param annotationTypeIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>  getPsmBestFilterableAnnDataList_ObjectsNotFullyPopulated( 
			int searchId, 
    		List<Integer> reportedPeptideIds,
    		List<Integer> annotationTypeIds ) throws SQLException {

		if ( reportedPeptideIds.isEmpty() ) {
			//  No Reported Peptide Ids so return empty list
			return new ArrayList<>();
		}

		if ( annotationTypeIds.isEmpty() ) {
			//  No Ann Type Ids so return empty list
			return new ArrayList<>();
		}
		
		List<PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item> resultList = new ArrayList<>( 10000 );
		
		StringBuilder sqlSB = new StringBuilder( 50000 );
		
		sqlSB.append( SQL_MAIN );
		
		sqlSB.append( SQL_ANN_TYPE_VALUES_START );
		
		for ( int i = 0; i < annotationTypeIds.size(); i++ ) {
			if ( i != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( SQL_ANN_TYPE_VALUES_END );
		

		sqlSB.append( SQL_REPORTED_PEPTIDE_ID_VALUES_START );
		
		for ( int i = 0; i < reportedPeptideIds.size(); i++ ) {
			if ( i != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( SQL_REPORTED_PEPTIDE_ID_VALUES_END );
		
		final String querySQL = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement pstmt = connection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;

			paramCounter++;
			pstmt.setInt( paramCounter, searchId );
			
			// Process Ann Type Ids
			for ( Integer annotationTypeId : annotationTypeIds ) {
				paramCounter++;
				pstmt.setInt( paramCounter, annotationTypeId );
			}

			// Process Reported Peptide Ids
			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				paramCounter++;
				pstmt.setInt( paramCounter, reportedPeptideId );
			}

//			if ( log.isDebugEnabled() ) {
//			if ( pstmt instanceof org.apache.commons.dbcp2.DelegatingPreparedStatement ) {
//				//  Use with DBCP in web app 
//				String executedStatement = "Executed Statement: " + ((org.apache.commons.dbcp2.DelegatingPreparedStatement)pstmt).getDelegate().toString();
//				log.debug( executedStatement );
//			}
			//  Cannot use since jar not in classpath for compile
//			if ( pstmt instanceof org.apache.tomcat.dbcp.dbcp2.DelegatingPreparedStatement ) {
//				//  Use with DBCP in Tomcat 
//				String executedStatement = "Executed Statement: " + ((org.apache.tomcat.dbcp.dbcp2.DelegatingPreparedStatement)pstmt).getDelegate().toString();
//				log.debug( executedStatement );
//			}
//			}
			
			try ( ResultSet rs = pstmt.executeQuery() ) {
				while( rs.next() ) {
					PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item item = new PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item();
					item.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );
					item.setAnnotationTypeId( rs.getInt( "annotation_type_id" ) );
					item.setBestPsmValue( rs.getDouble( "best_psm_value_for_ann_type_id" ) );
					resultList.add( item );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}
		
}
