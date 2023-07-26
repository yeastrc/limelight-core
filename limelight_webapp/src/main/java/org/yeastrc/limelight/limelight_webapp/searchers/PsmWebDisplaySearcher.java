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
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * 
 *
 */
@Component
public class PsmWebDisplaySearcher extends Limelight_JDBC_Base implements PsmWebDisplaySearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PsmWebDisplaySearcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	private static final String SQL_MAIN = 
			"SELECT psm_tbl.id AS psm_id, psm_tbl.reported_peptide_id, "
			+ 		" psm_tbl.has_modifications, psm_tbl.has_open_modifications, psm_tbl.has_reporter_ions, "
			+ 		" is_independent_decoy, "  //  Not return 'is_decoy' since excluded in SQL
			+ 		" psm_tbl.charge, psm_tbl.precursor_retention_time, psm_tbl.precursor_m_z, "
			+ 		 " psm_tbl.scan_number AS scan_number, psm_tbl.search_scan_file_id, "
			+        " search_scan_file_tbl.filename AS scan_filename, search_scan_file_tbl.scan_file_id AS scan_file_id "
			+ " FROM psm_tbl  "
			+ " LEFT OUTER JOIN search_scan_file_tbl ON psm_tbl.search_scan_file_id = search_scan_file_tbl.id ";
	
	private static final String SQL_INNER_JOIN_SEARCH_SUB_GROUP_TABLE =
			" INNER JOIN psm_search_sub_group_tbl ON psm_tbl.id = psm_search_sub_group_tbl.psm_id ";

	private static final String SQL_WHERE_START =  " WHERE psm_tbl.search_id = ? ";
	
	  

	/**
	 * @param searchId
	 * @param reportedPeptideId - Optional
	 * @param searchSubGroupId - Optional
	 * @param psmIds_Include - Optional.  If populated, overrides searcherCutoffValuesSearchLevel
	 * @param psmIds_Exclude - Optional.  Currently no value ever passed
	 * @param searcherCutoffValuesSearchLevel - PSM and Peptide cutoffs for a search id
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<PsmWebDisplayWebServiceResult> getPsmsWebDisplay( 
			int searchId, 
			Integer reportedPeptideId, //  Optional
			Integer searchSubGroupId,  //  Optional
			List<Long> psmIds_Include, //  Optional
			List<Long> psmIds_Exclude, //  Optional - Currently no value ever passed 
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel  ) throws Exception {

		if ( reportedPeptideId == null && ( psmIds_Include == null || psmIds_Include.isEmpty() ) ) {
			String msg = "reported peptide id is null and ( psmIds_Include is null or empty ).";
			log.warn(msg);
			throw new LimelightInternalErrorException(msg);
		}

		if ( reportedPeptideId == null && searchSubGroupId != null ) {
			String msg = "reported peptide id is null and searchSubGroupId != null.";
			log.warn(msg);
			throw new LimelightInternalErrorException(msg);
		}
		
//		if ( psmIds_Include != null && ( ! psmIds_Include.isEmpty() )
//				&& psmIds_Exclude != null && ( ! psmIds_Exclude.isEmpty() ) ) {
//			
//			String msg = "Invalid Input: true: psmIds_Include != null && ( ! psmIds_Include.isEmpty() ) && psmIds_Exclude != null && ( ! psmIds_Exclude.isEmpty() )";
//			log.error( msg );
//			throw new LimelightInternalErrorException(msg);
//		}
		
		List<PsmWebDisplayWebServiceResult> psms = new ArrayList<PsmWebDisplayWebServiceResult>();
		
		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);

		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList = 
				searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList();
		StringBuilder sqlSB = new StringBuilder( 1000 );
		//////////////////////
		/////   Start building the SQL
		sqlSB.append( SQL_MAIN );
		
		if ( searchSubGroupId != null ) {
			
			sqlSB.append( SQL_INNER_JOIN_SEARCH_SUB_GROUP_TABLE );
		}
		
		if ( psmIds_Include == null || psmIds_Include.isEmpty() ) {
			//  Add inner join for each PSM cutoff
			for ( int counter = 1; counter <= psmCutoffValuesList.size(); counter++ ) {
				sqlSB.append( " INNER JOIN " );
				sqlSB.append( " psm_filterable_annotation_tbl AS psm_fltrbl_tbl_" );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( " ON "  );
				sqlSB.append( " psm_tbl.id = "  );
				sqlSB.append( "psm_fltrbl_tbl_" );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".psm_id" );
			}
		}
		
		///////////
		sqlSB.append( SQL_WHERE_START );
		//////////
		
		if ( reportedPeptideId != null ) {
			sqlSB.append( " AND psm_tbl.reported_peptide_id = ?  " );
		}
		

		// Include  records where is_independent_decoy = 'true'
		
		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
			
			// Exclude  records where is_decoy = 'true'
			
			sqlSB.append( " AND is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
		}

		
		if ( searchSubGroupId != null ) {
			
			sqlSB.append( " AND psm_search_sub_group_tbl.search_sub_group_id = ?  " );
		}
		
		if ( psmIds_Include == null || psmIds_Include.isEmpty() ) {

			// Process PSM Cutoffs for WHERE

			int counter = 0; 
			for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesPsmAnnotationLevel : psmCutoffValuesList ) {
				AnnotationTypeDTO srchPgmFilterablePsmAnnotationTypeDTO = searcherCutoffValuesPsmAnnotationLevel.getAnnotationTypeDTO();
				counter++;
				sqlSB.append( " AND " );
				sqlSB.append( " ( " );
				sqlSB.append( "psm_fltrbl_tbl_" );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".annotation_type_id = ? AND " );
				sqlSB.append( "psm_fltrbl_tbl_" );
				sqlSB.append( Integer.toString( counter ) );
				sqlSB.append( ".value_double " );
				if ( srchPgmFilterablePsmAnnotationTypeDTO.getAnnotationTypeFilterableDTO() == null ) {
					String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + srchPgmFilterablePsmAnnotationTypeDTO.getId();
					log.error( msg );
					throw new Exception(msg);
				}
				if ( srchPgmFilterablePsmAnnotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
				} else {
					sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
				}
				sqlSB.append( " ? " );
				sqlSB.append( " ) " );
			}
		} else {
			
			//  Filter using psmIds Includes
			
			sqlSB.append( " AND psm_tbl.id IN ( " );
			
			for ( int counter = 1; counter <= psmIds_Include.size(); counter++ ) {
				if ( counter != 1 ) {
					sqlSB.append( "," );
				}
				sqlSB.append( "?" );
			}
			sqlSB.append( " ) " );
		}
		

		if ( psmIds_Exclude != null && ( ! psmIds_Exclude.isEmpty() ) ) {

			//  Filter using psmIds Excludes
			
			sqlSB.append( " AND psm_tbl.id NOT IN ( " );
			
			for ( int counter = 1; counter <= psmIds_Exclude.size(); counter++ ) {
				if ( counter != 1 ) {
					sqlSB.append( "," );
				}
				sqlSB.append( "?" );
			}
			sqlSB.append( " ) " );
		}
		
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, searchId );
			
			if ( reportedPeptideId != null ) {
				paramCounter++;
				preparedStatement.setInt( paramCounter, reportedPeptideId );
			}
			
			if ( searchSubGroupId != null ) {
				paramCounter++;
				preparedStatement.setInt( paramCounter, searchSubGroupId );
			}
			
			if ( psmIds_Include == null || psmIds_Include.isEmpty() ) {

				// Process PSM Cutoffs for WHERE
				
//				if ( ! onlyDefaultPsmCutoffs ) {
					//  PSM Cutoffs are not the default 
					for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesPsmAnnotationLevel : psmCutoffValuesList ) {
						AnnotationTypeDTO srchPgmFilterablePsmAnnotationTypeDTO = searcherCutoffValuesPsmAnnotationLevel.getAnnotationTypeDTO();
						paramCounter++;
						preparedStatement.setInt( paramCounter, srchPgmFilterablePsmAnnotationTypeDTO.getId() );
						paramCounter++;
						preparedStatement.setDouble( paramCounter, searcherCutoffValuesPsmAnnotationLevel.getAnnotationCutoffValue() );
					}
//				}
			} else {

				//  Filter using psmIds Includes

				for ( Long psmId : psmIds_Include ) {
					paramCounter++;
					preparedStatement.setLong(paramCounter, psmId );
				}
			}

			if ( psmIds_Exclude != null && ( ! psmIds_Exclude.isEmpty() ) ) {

				//  Filter using psmIds Excludes
				
				for ( Long psmId : psmIds_Exclude ) {
					paramCounter++;
					preparedStatement.setLong(paramCounter, psmId );
				}
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					PsmWebDisplayWebServiceResult psmWebDisplay = new PsmWebDisplayWebServiceResult();
					psmWebDisplay.setSearchId( searchId );
					psmWebDisplay.setPsmId( rs.getLong( "psm_id" ) );
					
					psmWebDisplay.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );

					{
						int intValue = rs.getInt( "has_modifications" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psmWebDisplay.setHasModifications( true );
						}
					}
					{
						int intValue = rs.getInt( "has_open_modifications" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psmWebDisplay.setHasOpenModifications( true );
						}
					}
					{
						int intValue = rs.getInt("has_reporter_ions" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psmWebDisplay.setHasReporterIons( true );
						}
					}
					
					//  NOT return 'is_decoy' since Excluded in SQL

					{
						int intValue = rs.getInt("is_independent_decoy" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psmWebDisplay.setPsmIs_IndependentDecoy( true );
						}
					}

					psmWebDisplay.setCharge( rs.getInt( "charge" ) );
					psmWebDisplay.setPsm_precursor_RetentionTime( rs.getBigDecimal( "precursor_retention_time" ) );
					psmWebDisplay.setPsm_precursor_MZ( rs.getBigDecimal( "precursor_m_z" ) );
					
					psmWebDisplay.setScanNumber( rs.getInt( "scan_number" ) );
					{
						int searchScanFileId = rs.getInt( "search_scan_file_id" );
						if ( ! rs.wasNull() ) {
							psmWebDisplay.setSearchScanFileId( searchScanFileId );
						}
					}
					psmWebDisplay.setScanFilename( rs.getString( "scan_filename" ) );
					
					int scanFileId = rs.getInt( "scan_file_id" );
					if ( ! rs.wasNull() ) {
						psmWebDisplay.setScanFileId( scanFileId );
					}

					psms.add( psmWebDisplay );
				}
			}
		} catch ( Exception e ) {
			String msg = "Exception in getPsmsInternal( ... ): sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return psms;
	}
}
