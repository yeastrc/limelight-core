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
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationDataBaseDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searcher_utils.DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataIF;
import org.yeastrc.limelight.limelight_webapp.searcher_utils.DefaultCutoffsExactlyMatchAnnTypeDataToSearchData.DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmAnnotationDTO;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmBestValuesForReportedPeptideIdSearchIdResult;

/**
 * PSM best filterable values for Reported Peptide Id and Search Id.
 * 
 * Also, if default cutoffs, return the Num PSM at default cutoff
 */
@Component
public class PsmBestValuesForReportedPeptideIdSearchIdSearcher extends Limelight_JDBC_Base implements PsmBestValuesForReportedPeptideIdSearchIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PsmBestValuesForReportedPeptideIdSearchIdSearcher.class );
	
	@Autowired
	private DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataIF defaultCutoffsExactlyMatchAnnTypeDataToSearchData;
	
	@Autowired
	private PsmCountForSearchIdReportedPeptideIdCutoffsSearcherIF psmCountForSearchIdReportedPeptideIdSearcher;
		
	private final String PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS = "psm_fltrbl_tbl_";
	
	private final String SQL_FIRST_PART = 
			"SELECT unified_rp__search__rep_pept__lookup_tbl.reported_peptide_id, "
			+ " unified_rp__search__rep_pept__lookup_tbl.unified_reported_peptide_id, "
			+ " unified_rp__search__rep_pept__lookup_tbl.psm_num_at_default_cutoff, "
			+ " unified_rp__search__rep_pept__lookup_tbl.num_unique_psm_at_default_cutoff ";
	
	private final String SQL_MAIN_FROM_START = " FROM unified_rp__search__rep_pept__lookup_tbl ";

	private final String SQL_MAIN_WHERE_START = 
			" WHERE unified_rp__search__rep_pept__lookup_tbl.search_id = ? ";
	
	private final String SQL_WHERE_REPORTED_PEPTIDE_IDS_START = 
			" AND unified_rp__search__rep_pept__lookup_tbl.reported_peptide_id IN ( ";
	
	private final String SQL_WHERE_REPORTED_PEPTIDE_IDS_END = " ) ";
	
	@Override
	public List<PsmBestValuesForReportedPeptideIdSearchIdResult>  getBestPsmValuesList( 
			int searchId, 
			List<Integer> reportedPeptideIds,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {

		if ( reportedPeptideIds == null || reportedPeptideIds.isEmpty() ) {
			throw new IllegalArgumentException("reportedPeptideIds is null or empty");
		}
		
		List<PsmBestValuesForReportedPeptideIdSearchIdResult> resultList = new ArrayList<>();

		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList = searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList();
		List<SearcherCutoffValuesAnnotationLevel> peptideCutoffValuesList = searcherCutoffValuesSearchLevel.getPeptidePerAnnotationCutoffsList();
		//  If null, create empty lists
		if ( peptideCutoffValuesList == null ) {
			peptideCutoffValuesList = new ArrayList<>();
		}
		if ( psmCutoffValuesList == null ) {
			psmCutoffValuesList = new ArrayList<>();
		}
		List<AnnotationTypeDTO> peptideCutoffsAnnotationTypeDTOList = new ArrayList<>( psmCutoffValuesList.size() );
		List<AnnotationTypeDTO> psmCutoffsAnnotationTypeDTOList = new ArrayList<>( psmCutoffValuesList.size() );
		for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesAnnotationLevel : peptideCutoffValuesList ) {
			peptideCutoffsAnnotationTypeDTOList.add( searcherCutoffValuesAnnotationLevel.getAnnotationTypeDTO() );
		}
		for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesAnnotationLevel : psmCutoffValuesList ) {
			psmCutoffsAnnotationTypeDTOList.add( searcherCutoffValuesAnnotationLevel.getAnnotationTypeDTO() );
		}
		
		//  Determine if can use PSM count at Default Cutoff
		DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult defaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult =
				defaultCutoffsExactlyMatchAnnTypeDataToSearchData
				.defaultCutoffsExactlyMatchAnnTypeDataToSearchData( searchId, searcherCutoffValuesSearchLevel );
		boolean defaultCutoffsExactlyMatchAnnTypeDataToSearchData =
				defaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult.isDefaultCutoffsExactlyMatchAnnTypeDataToSearchData();

		//////////////////////
		/////   Start building the SQL
		StringBuilder sqlSB = new StringBuilder( 1000 );
		sqlSB.append( SQL_FIRST_PART );
		///////   Add fields to result from best PSM annotation values
		{
//			if ( ( ! defaultCutoffsExactlyMatchAnnTypeDataToSearchData )
//					|| ( ! USE_PEPTIDE_PSM_DEFAULTS_TO_SKIP_JOIN_ANNOTATION_DATA_VALUES_TABLES ) ) {
			
				//  Non-Default PSM or Peptide cutoffs so have to query on the cutoffs
				//  Add Field retrieval for each PSM cutoff
				for ( int counter = 1; counter <= psmCutoffValuesList.size(); counter++ ) {
					sqlSB.append( " , " );
					sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( ".annotation_type_id " );
					sqlSB.append( " AS "  );
					sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( "_annotation_type_id " );
					sqlSB.append( " , " );
					sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( ".best_psm_value_for_ann_type_id " );
					sqlSB.append( " AS "  );
					sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( "_best_psm_value_for_ann_type_id " );
				}
//			}
		}

		sqlSB.append( SQL_MAIN_FROM_START );
		{
//			if ( ( ( ! defaultCutoffsExactlyMatchAnnTypeDataToSearchData ) )
//					|| ( ! USE_PEPTIDE_PSM_DEFAULTS_TO_SKIP_JOIN_ANNOTATION_DATA_VALUES_TABLES ) ) {
				//  Non-Default PSM or Peptide cutoffs so have to query on the cutoffs
				//  Add inner join for each PSM cutoff
				for ( int counter = 1; counter <= psmCutoffValuesList.size(); counter++ ) {
					sqlSB.append( " INNER JOIN " );
					sqlSB.append( " unified_rp__search__rep_pept__best_psm_value_lookup_tbl AS " );
					sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( " ON "  );
					sqlSB.append( " unified_rp__search__rep_pept__lookup_tbl.search_id = "  );
					sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( ".search_id" );
					sqlSB.append( " AND " );
					sqlSB.append( " unified_rp__search__rep_pept__lookup_tbl.reported_peptide_id = "  );
					sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
					sqlSB.append( Integer.toString( counter ) );
					sqlSB.append( ".reported_peptide_id" );
				}
//			}
		}
		
		/////////  WHERE START
		
		
		sqlSB.append( SQL_MAIN_WHERE_START );
		
		sqlSB.append( SQL_WHERE_REPORTED_PEPTIDE_IDS_START );
		
		int reportedPeptideIdsSize = reportedPeptideIds.size();
		for ( int counter = 0; counter < reportedPeptideIdsSize; counter++ ) {
			if ( counter != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		
		sqlSB.append( SQL_WHERE_REPORTED_PEPTIDE_IDS_END );
		
		// Process PSM Annotation Type Ids for WHERE
		{
			int counter = 0; 
			for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesPsmAnnotationLevel : psmCutoffValuesList ) {
//				AnnotationTypeDTO psmAnnotationTypeDTO = searcherCutoffValuesPsmAnnotationLevel.getAnnotationTypeDTO();
				counter++;
				sqlSB.append( " AND " );
				sqlSB.append( " ( " );
				sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".search_id = ? AND " );
				sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".annotation_type_id = ? " );
				sqlSB.append( " ) " );
			}
		}
		
		
		final String querySQL = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement pstmt = connection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;

			
			//   For:   unified_rp__search__rep_pept__generic_lookup.search_id = ? 
			paramCounter++;
			pstmt.setInt( paramCounter, searchId );
			
			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				paramCounter++;
				pstmt.setInt( paramCounter, reportedPeptideId );
			}
			

			// Process PSM Annotation Type Ids for WHERE
			{
				for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesPsmAnnotationLevel : psmCutoffValuesList ) {
					AnnotationTypeDTO psmAnnotationTypeDTO = searcherCutoffValuesPsmAnnotationLevel.getAnnotationTypeDTO();
					paramCounter++;
					pstmt.setInt( paramCounter, psmAnnotationTypeDTO.getSearchId() );
					paramCounter++;
					pstmt.setInt( paramCounter, psmAnnotationTypeDTO.getId() );
				}
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
				Set<Integer> retrieved_reported_peptide_id_values_Set = new HashSet<>();
				while( rs.next() ) {
					PsmBestValuesForReportedPeptideIdSearchIdResult item = 
							populateFromResultSet( 
									rs, 
									searchId,
									searcherCutoffValuesSearchLevel, 
									peptideCutoffsAnnotationTypeDTOList,
									psmCutoffsAnnotationTypeDTOList,
									defaultCutoffsExactlyMatchAnnTypeDataToSearchData,
									querySQL );
					if ( item != null ) {
						int itemReportedPeptideId = item.getReportedPeptideId();
						if ( ! retrieved_reported_peptide_id_values_Set.add( itemReportedPeptideId ) ) {
//							String msg = "Already processed result entry for itemReportedPeptideId: " + itemReportedPeptideId;
//							log.warn( msg );
//							log.error( msg );
//							throw new LimelightWebappDataException(msg);
						} else {
							resultList.add( item );
						}
					}
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}
	

	/**
	 * @param rs
	 * @param searchDTO
	 * @param searcherCutoffValuesSearchLevel
	 * @param defaultCutoffsExactlyMatchAnnTypeDataToSearchData
	 * @param sql
	 * @return - null if PSM count is zero or link type unknown, otherwise a populated object 
	 * @throws SQLException
	 * @throws Exception
	 */
	private PsmBestValuesForReportedPeptideIdSearchIdResult populateFromResultSet(
			ResultSet rs,
			int searchId,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel, 
			List<AnnotationTypeDTO> peptideCutoffsAnnotationTypeDTOList,
			List<AnnotationTypeDTO> psmCutoffsAnnotationTypeDTOList,
			boolean defaultCutoffsExactlyMatchAnnTypeDataToSearchData,
			String sql
			) throws SQLException {
		PsmBestValuesForReportedPeptideIdSearchIdResult item = new PsmBestValuesForReportedPeptideIdSearchIdResult();
		int reportedPeptideId = rs.getInt( "reported_peptide_id" );
		int unifiedReportedPeptideId = rs.getInt( "unified_reported_peptide_id" );
		item.setReportedPeptideId(reportedPeptideId);
		item.setUnifiedReportedPeptideId( unifiedReportedPeptideId );
		
		if ( defaultCutoffsExactlyMatchAnnTypeDataToSearchData ) {
			int numPsmsForDefaultCutoffs = rs.getInt( "psm_num_at_default_cutoff" );
			if ( ! rs.wasNull() ) {
				item.setNumPsms( numPsmsForDefaultCutoffs );
			}
//			int numUniquePsmsForDefaultCutoffs = rs.getInt( "num_unique_psm_at_default_cutoff" );
//			if ( ! rs.wasNull() ) {
//				item.setNumUniquePsms( numUniquePsmsForDefaultCutoffs );
//			}
		} 
		
		if ( peptideCutoffsAnnotationTypeDTOList.size() > 1 
				|| psmCutoffsAnnotationTypeDTOList.size() > 1 ) {

			// At least one of the cutoffs lists is > 1: 
			//   need to determine that Reported Peptide has at least 1 PSM that meets all cutoffs
			
			//      Maybe only need to do this when psmCutoffsAnnotationTypeDTOList.size() > 1
			
			//     Get num PSMs to ensure there is at least 1 PSM that meets all cutoffs
			
			//  Start with item.getNumPsms() since it may have been set above when have default cutoffs

			int numPsms = -1;
			if ( item.getNumPsms() != null ) {
				numPsms = item.getNumPsms();
			} else { 
				//  Get value for numPSMs and store in item
				numPsms = 
						psmCountForSearchIdReportedPeptideIdSearcher
						.getPsmCountForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
				item.setNumPsms( numPsms );
			}
			if ( numPsms <= 0 ) {
				//  !!!!!!!   Number of PSMs is zero this this isn't really a peptide that meets the cutoffs
				return null;  //  EARY EXIT
			}
		}
		
		//  Get Peptide and PSM annotations
		//  Peptide annotations are for Peptide annotations searched for
		//  PSM annotations are for PSM annotations searched for and are best values for the peptides
			
//		if ( ( ( ! defaultCutoffsExactlyMatchAnnTypeDataToSearchData ) )
//				|| ( ! USE_PEPTIDE_PSM_DEFAULTS_TO_SKIP_JOIN_ANNOTATION_DATA_VALUES_TABLES ) ) {
			//  Get PSM best values from DB query, since psm best value table was joined
			Map<Integer, AnnotationDataBaseDTO> bestPsmAnnotationDTOFromQueryMap =
					getPSMBestValuesFromDBQuery( rs, psmCutoffsAnnotationTypeDTOList );
			item.setPsmAnnotationDTOMap( bestPsmAnnotationDTOFromQueryMap );
//		} else {
			
		//  WAS COMMENTED OUT
			
			//  Get PSM best values in separate DB query, since psm best value table was not joined
//			List<PsmAnnotationDTO> bestPsmAnnotationDTOList = 
//					PsmAnnotationDataBestValueForPeptideSearcher.getInstance()
//					.getPsmAnnotationDataBestValueForPeptideList( search.getId(), reportedPeptideId, psmCutoffsAnnotationTypeDTOList );
//			item.setBestPsmAnnotationDTOList( bestPsmAnnotationDTOList );
//			int z = 0;
			
//		}
			
			
		return item;
	}

	/**
	 * Get PSM best values from DB query, since psm best value table was joined
	 * @param rs
	 * @param psmCutoffsAnnotationTypeDTOList
	 * @return
	 * @throws SQLException
	 */
	private Map<Integer, AnnotationDataBaseDTO> getPSMBestValuesFromDBQuery( 
			ResultSet rs,
			List<AnnotationTypeDTO> psmCutoffsAnnotationTypeDTOList
			) throws SQLException { 
		Map<Integer, AnnotationDataBaseDTO> bestPsmAnnotationDTOFromQueryMap = new HashMap<>();
		//  Add inner join for each PSM cutoff
		for ( int counter = 1; counter <= psmCutoffsAnnotationTypeDTOList.size(); counter++ ) {
			PsmAnnotationDTO item = new PsmAnnotationDTO();
			String annotationTypeIdField = PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS + counter + "_annotation_type_id";
			String valueDoubleField = PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS + counter + "_best_psm_value_for_ann_type_id";
			item.setAnnotationTypeId( rs.getInt( annotationTypeIdField ) );
			double valueDouble = rs.getDouble( valueDoubleField );
			item.setValueDouble( valueDouble );
			item.setValueString( Double.toString( valueDouble ) );
			bestPsmAnnotationDTOFromQueryMap.put( item.getAnnotationTypeId(),  item );
		}
		return bestPsmAnnotationDTOFromQueryMap;
	}
	  
}
