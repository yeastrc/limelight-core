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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.constants.SearcherGeneralConstants;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;

/**
 * 
 * !!!  WARNING  !!!!
 * 
 * Call ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(...) to get:
 * 
 *    1)  Correct call for Default Cutoffs when possible to get faster query
 * 
 * 
 * 
 * Returns a minimal set of data for each reported peptide that meets the criteria
 * 
 * Assumed NOT Default Cutoffs.  NO optimizations that use default cutoffs
 * 
 * Performance Improvements: TODO
 *   
 *    * Change call to psmCountForSearchIdReportedPeptideIdSearcher.getPsmCountForSearchIdReportedPeptideIdCutoffs(...)
 *        to a call to only validate that the min number of PSMs specified exist for the reported peptide
 * 
 * 	  * Remove table search__rep_pept__lookup_tbl from join.
 * 
 * Criteria:
 *    Search Id
 *    Cutoffs for Reported Peptide Annotation Type Data
 *    Cutoffs for Best PSM Annotation Type Data at the Reported Peptide level
 *    
 *    
 * Side complexity:
 * 
 *    For cutoffs for Best PSM Annotation Type Data at the Reported Peptide level:
 *    
 *       Performing a SQL AND of 2 or more columns of Best PSM Annotation Type Values
 *       does not result in a Reported Peptide Id record that is guaranteed 
 *       to have at least 1 PSM that meets all the cutoffs.
 *       So, if there are > 1 PSM cutoffs and the PSM cutoffs are not the default cutoffs
 *       there needs to be a check for each Reported Peptide Id 
 *       that the PSM table contains at least 1 PSM (Or a minimum number of PSMs) 
 *       that meets all the PSM cutoffs.
 */
@Component
public class ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher extends Limelight_JDBC_Base implements ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher.class );
	
	@Autowired
	private PsmCountForSearchIdReportedPeptideIdCutoffsSearcherIF psmCountForSearchIdReportedPeptideIdSearcher;
		
	private final String PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS = "psm_fltrbl_tbl_";
	private final String PEPTIDE_VALUE_FILTER_TABLE_ALIAS = "srch__rep_pept_fltrbl_tbl_";
	
	private final String SQL_FIRST_PART = 
			"SELECT search__rep_pept__lookup_tbl.reported_peptide_id, "
					+ " search__rep_pept__lookup_tbl.has_dynamic_modifictions, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_dynamic_modifications, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_open_modifictions, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_reporter_ions "
			;
	
	private final String SQL_MAIN_FROM_START = " FROM search__rep_pept__lookup_tbl ";

	private final String SQL_MAIN_WHERE_START = 
			" WHERE search__rep_pept__lookup_tbl.search_id = ? ";

	private final String SQL_LAST_PART = "";

	
	/**
	 * 
	 * !!!  WARNING  !!!!
	 * 
	 * Call ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList(...) to get:
	 * 
	 *    1)  Correct call for Default Cutoffs when possible to get faster query
	 * 
	 * 
	 * 
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @param minimumNumberOfPSMsPerReportedPeptide
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<ReportedPeptide_MinimalData_List_FromSearcher_Entry>  getPeptideDataList( 
			int searchId, 
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel,
			int minimumNumberOfPSMsPerReportedPeptide ) throws Exception {

		if ( minimumNumberOfPSMsPerReportedPeptide < 1 ) {
			String msg = "minimumNumberOfPSMsPerReportedPeptide must be >= 1";
			log.error( msg );
			throw new IllegalArgumentException(msg);
		}

		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> resultList = new ArrayList<>();
		
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList = searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList();
		List<SearcherCutoffValuesAnnotationLevel> peptideCutoffValuesList = searcherCutoffValuesSearchLevel.getPeptidePerAnnotationCutoffsList();
		//  If null, create empty lists
		if ( peptideCutoffValuesList == null ) {
			peptideCutoffValuesList = new ArrayList<>();
		}
		if ( psmCutoffValuesList == null ) {
			psmCutoffValuesList = new ArrayList<>();
		}
		
		//////////////////////
		/////   Start building the SQL
		StringBuilder sqlSB = new StringBuilder( 1000 );
		sqlSB.append( SQL_FIRST_PART );
		///////   Add fields to result from best PSM annotation values
		{
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
		}
		///////   Add fields to result from best Peptide annotation values
		{
			//  Add inner join for each Peptide cutoff
			for ( int counter = 1; counter <= peptideCutoffValuesList.size(); counter++ ) {
				sqlSB.append( " , " );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".annotation_type_id " );
				sqlSB.append( " AS "  );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( "_annotation_type_id " );
				sqlSB.append( " , " );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".value_double " );
				sqlSB.append( " AS "  );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( "_value_double " );
				sqlSB.append( " , " );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".value_string " );
				sqlSB.append( " AS "  );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( "_value_string " );
			}
		}
		sqlSB.append( SQL_MAIN_FROM_START );
		{
			//  Add inner join for each PSM cutoff
			for ( int counter = 1; counter <= psmCutoffValuesList.size(); counter++ ) {
				sqlSB.append( " INNER JOIN " );
				sqlSB.append( " search__rep_pept__best_psm_value_lookup_tbl AS " );
				sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( " ON "  );
				sqlSB.append( " search__rep_pept__lookup_tbl.search_id = "  );
				sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".search_id" );
				sqlSB.append( " AND " );
				sqlSB.append( " search__rep_pept__lookup_tbl.reported_peptide_id = "  );
				sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".reported_peptide_id" );
			}
		}
		{
			//  Add inner join for each Peptide cutoff
			for ( int counter = 1; counter <= peptideCutoffValuesList.size(); counter++ ) {
				sqlSB.append( " INNER JOIN " );
				sqlSB.append( " srch__rep_pept_filterable_annotation_tbl AS " );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( " ON "  );
				sqlSB.append( " search__rep_pept__lookup_tbl.search_id = "  );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".search_id" );
				sqlSB.append( " AND " );
				sqlSB.append( " search__rep_pept__lookup_tbl.reported_peptide_id = "  );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".reported_peptide_id" );
			}
		}
		
		/////////  WHERE START
		
		
		sqlSB.append( SQL_MAIN_WHERE_START );
		
		
		// Process PSM Cutoffs for WHERE
		{
			int counter = 0; 
			for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesPsmAnnotationLevel : psmCutoffValuesList ) {
				AnnotationTypeDTO psmAnnotationTypeDTO = searcherCutoffValuesPsmAnnotationLevel.getAnnotationTypeDTO();
				counter++;
				sqlSB.append( " AND " );
				sqlSB.append( " ( " );
				sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".search_id = ? AND " );
				sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".annotation_type_id = ? AND " );
				sqlSB.append( PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".best_psm_value_for_ann_type_id " );
				if ( psmAnnotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() 
						== FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
				} else {
					sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
				}
				sqlSB.append( " ? " );
				sqlSB.append( " ) " );
			}
		}
		//  Process Peptide Cutoffs for WHERE
		{
			int counter = 0; 
			for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesReportedPeptideAnnotationLevel : peptideCutoffValuesList ) {
				AnnotationTypeDTO reportedPeptideAnnotationTypeDTO = searcherCutoffValuesReportedPeptideAnnotationLevel.getAnnotationTypeDTO();
				counter++;
				sqlSB.append( " AND " );
				sqlSB.append( " ( " );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".search_id = ? AND " );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".annotation_type_id = ? AND " );
				sqlSB.append( PEPTIDE_VALUE_FILTER_TABLE_ALIAS );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".value_double " );
				if ( reportedPeptideAnnotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() 
						== FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
				} else {
					sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
				}
				sqlSB.append( "? " );
				sqlSB.append( " ) " );
			}
		}		
		sqlSB.append( SQL_LAST_PART );
		
		
		
		final String querySQL = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement pstmt = connection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;

			
			//   For:   unified_rp__search__rep_pept__generic_lookup.search_id = ? 
			paramCounter++;
			pstmt.setInt( paramCounter, searchId );
			// Process PSM Cutoffs for WHERE
			{
				for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesPsmAnnotationLevel : psmCutoffValuesList ) {
					AnnotationTypeDTO srchPgmFilterablePsmAnnotationTypeDTO = searcherCutoffValuesPsmAnnotationLevel.getAnnotationTypeDTO();
					paramCounter++;
					pstmt.setInt( paramCounter, searchId );
					paramCounter++;
					pstmt.setInt( paramCounter, srchPgmFilterablePsmAnnotationTypeDTO.getId() );
					paramCounter++;
					pstmt.setDouble( paramCounter, searcherCutoffValuesPsmAnnotationLevel.getAnnotationCutoffValue() );
				}
			}
			// Process Peptide Cutoffs for WHERE
			{
				for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesReportedPeptideAnnotationLevel : peptideCutoffValuesList ) {
					AnnotationTypeDTO srchPgmFilterableReportedPeptideAnnotationTypeDTO = searcherCutoffValuesReportedPeptideAnnotationLevel.getAnnotationTypeDTO();
					paramCounter++;
					pstmt.setInt( paramCounter, searchId );
					paramCounter++;
					pstmt.setInt( paramCounter, srchPgmFilterableReportedPeptideAnnotationTypeDTO.getId() );
					paramCounter++;
					pstmt.setDouble( paramCounter, searcherCutoffValuesReportedPeptideAnnotationLevel.getAnnotationCutoffValue() );
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
				while( rs.next() ) {
					ReportedPeptide_MinimalData_List_FromSearcher_Entry item = 
							populateFromResultSet( 
									rs, 
									searchId,
									searcherCutoffValuesSearchLevel, 
									psmCutoffValuesList,
									minimumNumberOfPSMsPerReportedPeptide,
									querySQL );
					if ( item != null ) {
						resultList.add( item );
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
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @param psmCutoffValuesList
	 * @param minimumNumberOfPSMsPerReportedPeptide
	 * @param sql
	 * @return - null if PSM count is < minimumNumberOfPSMsPerReportedPeptide, otherwise a populated object 
	 * @throws SQLException
	 */
	private ReportedPeptide_MinimalData_List_FromSearcher_Entry populateFromResultSet(
			ResultSet rs,
			int searchId,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel, 
			List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList,
			int minimumNumberOfPSMsPerReportedPeptide,
			String sql
			) throws Exception {
		
		ReportedPeptide_MinimalData_List_FromSearcher_Entry item = new ReportedPeptide_MinimalData_List_FromSearcher_Entry();
		int reportedPeptideId = rs.getInt( "reported_peptide_id" );
		item.setReportedPeptideId(reportedPeptideId);
		
		{
			int reportedPeptideHas_DynamicModifications_Int = rs.getInt( "has_dynamic_modifictions" );
			if ( reportedPeptideHas_DynamicModifications_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				item.setReportedPeptideHas_DynamicModifications(true);
			}
		}
		{
			int anyPsmHas_DynamicModifications_Int = rs.getInt( "any_psm_has_dynamic_modifications" );
			if ( anyPsmHas_DynamicModifications_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				item.setAnyPsmHas_DynamicModifications(true);
			}
		}
		{
			int field_Int = rs.getInt( "any_psm_has_open_modifictions" );
			if ( field_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				item.setAnyPsmHas_OpenModifications(true);
			}
		}
		{
			int anyPsmHas_ReporterIons_Int = rs.getInt( "any_psm_has_reporter_ions" );
			if ( anyPsmHas_ReporterIons_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				item.setAnyPsmHas_ReporterIons(true);
			}
		}
		if ( ( psmCutoffValuesList != null && psmCutoffValuesList.size() > 1 )
				|| minimumNumberOfPSMsPerReportedPeptide > 1 ) {

			// PSM cutoffs lists is > 1 OR minimumNumberOfPSMsPerReportedPeptide > 1: 
			//   need to determine that Reported Peptide has at least minimumNumberOfPSMsPerReportedPeptide PSM that meets all cutoffs
			
			int numPsms = 
					psmCountForSearchIdReportedPeptideIdSearcher
					.getPsmCountForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
			
			if ( numPsms <= 0 ) {
				//  !!!!!!!   Number of PSMs is zero this this isn't really a peptide that meets the cutoffs
				return null;  //  EARY EXIT
			}
		}
			
		return item;
	}
	
}
