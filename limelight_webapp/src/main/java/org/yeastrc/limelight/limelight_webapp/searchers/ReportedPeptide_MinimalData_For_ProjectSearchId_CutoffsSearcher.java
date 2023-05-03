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
import java.util.concurrent.atomic.AtomicBoolean;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.constants.SearcherGeneralConstants;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.parallelstream_java_processing_enable_configuration.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF;
import org.yeastrc.limelight.limelight_webapp.parallelstream_java_processing_enable_configuration.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

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
 *       
 *  ----------------------
 *       
 *  Tables
 * 
 *   search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl		- For PSMs that are Target
 *   search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl - For PSMs that are Target or Independent Decoy
 *   search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl	- For PSMs that are Target or Independent Decoy or Decoy
 */
@Component
public class ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher extends Limelight_JDBC_Base 

implements ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcherIF,

InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{

	private static final Logger log = LoggerFactory.getLogger( ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher.class );
	
	@Autowired
	private PsmCountForSearchIdReportedPeptideIdCutoffsSearcherIF psmCountForSearchIdReportedPeptideIdSearcher;

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;


	@Autowired
	private ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF parallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup;

	private boolean parallelStream_DefaultThreadPool_Java_Processing_Enabled_True;

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			{
				ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response response = 
						parallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.get_ParallelStream_Java_Processing_Enable_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup();
				
				this.parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = response.isParallelStream_DefaultThreadPool_Java_Processing_Enabled_True();
			}
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	
	private final String PSM_BEST_VALUE_FOR_PEPTIDE_FILTER_TABLE_ALIAS = "psm_fltrbl_tbl_";
	private final String PEPTIDE_VALUE_FILTER_TABLE_ALIAS = "srch__rep_pept_fltrbl_tbl_";
	
	private final String SQL_FIRST_PART = 
			"SELECT search__rep_pept__lookup_tbl.reported_peptide_id, "
					+ " search__rep_pept__lookup_tbl.has_dynamic_modifictions, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_dynamic_modifications, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_open_modifictions, "
					+ " search__rep_pept__lookup_tbl.any_psm_has_reporter_ions "
					+ " FROM search__rep_pept__lookup_tbl ";


	//  search__rep_pept__psm_... tables

	private static final String TABLE_NAME_TARGET = "search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl";

	private static final String TABLE_NAME_TARGET_INDEPENDENT_DECOY = "search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl";

//	private static final String TABLE_NAME_TARGET_INDEPENDENT_DECOY_DECOY = "search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl";

	
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

		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> resultList = null;
		
		////
		
		String bestPsmValueLookup_TableName = null;

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsIndependentDecoy_True() ) {
			// Have psm_tbl.is_independent_decoy is true so use table
			bestPsmValueLookup_TableName = TABLE_NAME_TARGET_INDEPENDENT_DECOY;
		} else {
			bestPsmValueLookup_TableName = TABLE_NAME_TARGET;
		}
		
		//////
		
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
		
		{
			//  Add inner join for each PSM cutoff
			for ( int counter = 1; counter <= psmCutoffValuesList.size(); counter++ ) {
				sqlSB.append( " INNER JOIN " );
				sqlSB.append( bestPsmValueLookup_TableName );
				sqlSB.append( " AS " );
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
				

				List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> resultList_Temp = new ArrayList<>();
				
				
				while( rs.next() ) {
					
					ReportedPeptide_MinimalData_List_FromSearcher_Entry item = 
							populateFromResultSet( rs );

					if ( ( psmCutoffValuesList != null && psmCutoffValuesList.size() > 1 )
							|| minimumNumberOfPSMsPerReportedPeptide > 1 ) {

						// PSM cutoffs lists is > 1 OR minimumNumberOfPSMsPerReportedPeptide > 1: 
						//   need to determine that Reported Peptide has at least minimumNumberOfPSMsPerReportedPeptide PSM that meets all cutoffs
						
						int numPsms = 
								psmCountForSearchIdReportedPeptideIdSearcher
								.getPsmCountForSearchIdReportedPeptideIdCutoffs( item.getReportedPeptideId(), searchId, searcherCutoffValuesSearchLevel );
						
						if ( numPsms <= 0 ) {
							//  !!!!!!!   Number of PSMs is zero this this isn't really a peptide that meets the cutoffs
							continue;  //  EARY CONTINUE
						}
					}
						
					
					if ( item != null ) {
						resultList_Temp.add( item );
					}
				}
				

				if ( ( ! resultList_Temp.isEmpty() )
						&& ( ( psmCutoffValuesList != null && psmCutoffValuesList.size() > 1 )
								|| minimumNumberOfPSMsPerReportedPeptide > 1 ) ) {

					// PSM cutoffs lists is > 1 OR minimumNumberOfPSMsPerReportedPeptide > 1: 
					//   need to determine that Reported Peptide has at least minimumNumberOfPSMsPerReportedPeptide PSM that meets all cutoffs
					
					//  Perform Additional filtering

					List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> resultList_Temp_Filtered = new ArrayList<>( resultList_Temp.size() );

		        	{
		        		AtomicBoolean anyThrownInsideStreamProcessing = new AtomicBoolean(false);
		        		
		        		List<Throwable> thrownInsideStream_List = Collections.synchronizedList(new ArrayList<>());
		        		
//		        		for ( Integer reportedPeptideId : webserviceRequest.reportedPeptideIds ) {


			    		if ( this.parallelStream_DefaultThreadPool_Java_Processing_Enabled_True ) {
			
			    			//  YES execute in parallel
			
			    			resultList_Temp.parallelStream().forEach( reportedPeptide_MinimalData_List_FromSearcher_Entry -> { 

		        				try {

		    						// PSM cutoffs lists is > 1 OR minimumNumberOfPSMsPerReportedPeptide > 1: 
		    						//   need to determine that Reported Peptide has at least minimumNumberOfPSMsPerReportedPeptide PSM that meets all cutoffs
		    						
		    						int numPsms = 
		    								psmCountForSearchIdReportedPeptideIdSearcher
		    								.getPsmCountForSearchIdReportedPeptideIdCutoffs( reportedPeptide_MinimalData_List_FromSearcher_Entry.getReportedPeptideId(), searchId, searcherCutoffValuesSearchLevel );
		    						
		    						if ( numPsms <= 0 ) {
		    							//  !!!!!!!   Number of PSMs is zero this this isn't really a peptide that meets the cutoffs
		    							  //  EARY CONTINUE
		    						} else {
		    						
		    							synchronized(resultList_Temp_Filtered){
		    								resultList_Temp_Filtered.add( reportedPeptide_MinimalData_List_FromSearcher_Entry );
		    							}
		    						}

		        				} catch (Throwable t) {
		        					
		        					log.error( "Fail processing resultList_Temp: reportedPeptideId" + reportedPeptide_MinimalData_List_FromSearcher_Entry.getReportedPeptideId(), t);

		        					anyThrownInsideStreamProcessing.set(true);
		        					
		        					thrownInsideStream_List.add(t);
		        				}
		        			});
		        			
		        		} else {
		        			
		        			//  NOT execute in parallel

		        			resultList_Temp.forEach( reportedPeptide_MinimalData_List_FromSearcher_Entry -> {
		        			
		        				try {

		    						// PSM cutoffs lists is > 1 OR minimumNumberOfPSMsPerReportedPeptide > 1: 
		    						//   need to determine that Reported Peptide has at least minimumNumberOfPSMsPerReportedPeptide PSM that meets all cutoffs
		    						
		    						int numPsms = 
		    								psmCountForSearchIdReportedPeptideIdSearcher
		    								.getPsmCountForSearchIdReportedPeptideIdCutoffs( reportedPeptide_MinimalData_List_FromSearcher_Entry.getReportedPeptideId(), searchId, searcherCutoffValuesSearchLevel );
		    						
		    						if ( numPsms <= 0 ) {
		    							//  !!!!!!!   Number of PSMs is zero this this isn't really a peptide that meets the cutoffs
		    							  //  EARY CONTINUE
		    						} else {
		    						
		    							synchronized(resultList_Temp_Filtered){
		    								resultList_Temp_Filtered.add( reportedPeptide_MinimalData_List_FromSearcher_Entry );
		    							}
		    						}

		        				} catch (Throwable t) {
		        					
		        					log.error( "Fail processing resultList_Temp.  Rethrow in class LimelightInternalErrorException: reportedPeptideId" + reportedPeptide_MinimalData_List_FromSearcher_Entry.getReportedPeptideId(), t);
		        					
		        					anyThrownInsideStreamProcessing.set(true);
		        					
		        					thrownInsideStream_List.add(t);
		        					
		        					throw new LimelightInternalErrorException( t );
		        				}
		        			});
		        		}

		        		if ( anyThrownInsideStreamProcessing.get() ) {
		        			
		        			throw new LimelightInternalErrorException( "At least 1 exception processing resultList_Temp" );
		        		}
		        	}
		    		
					
					synchronized(resultList_Temp_Filtered) {
					
						//  Final copy here to ensure copied where main thread can access
						resultList = new ArrayList<>( resultList_Temp_Filtered );
					}
					
				} else {
				
					//  NO Additional Filtering needed
				
					resultList = resultList_Temp;
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
			ResultSet rs
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
		return item;
	}
	
}
