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
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 *
 */
@Deprecated  //  Deprecated since not used.  May have never been tested.

@Component
public class PsmIds_ForSearchCriteria_Searcher extends Limelight_JDBC_Base implements PsmIds_ForSearchCriteria_SearcherIF {

//	private static final Logger log = LoggerFactory.getLogger( PsmIds_ForSearchCriteria_Searcher.class );
//
//	private static final String SQL_MAIN = 
//			"SELECT psm_tbl.id AS psm_id "
//			+ " FROM psm_tbl ";
//	
//	private static final String SQL_WHERE_START =  " WHERE psm_tbl.search_id = ? AND psm_tbl.reported_peptide_id = ?  ";
//
//	/* (non-Javadoc)
//	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_ForSearchCriteria_SearcherIF#getPsmIds_ForSearchCriteria_Searcher(int, int, org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValuesSearchLevel)
//	 */
//	@Override
//	public List<Long> getPsmIds_ForSearchCriteria_Searcher( 
//			int searchId, 
//			int reportedPeptideId, 
//			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel  ) throws SQLException {
//		
//		List<Long> psmIds = new ArrayList<>();
//		
//		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList = 
//				searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList();
//		StringBuilder sqlSB = new StringBuilder( 1000 );
//		//////////////////////
//		/////   Start building the SQL
//		sqlSB.append( SQL_MAIN );
//		{
//				//  Add inner join for each PSM cutoff
//				for ( int counter = 1; counter <= psmCutoffValuesList.size(); counter++ ) {
//					sqlSB.append( " INNER JOIN " );
//					//  If slow, use psm_filterable_annotation__generic_lookup and put more limits in query on search, reported peptide, and maybe link type
//					sqlSB.append( " psm_filterable_annotation_tbl AS psm_fltrbl_tbl_" );
//					sqlSB.append( Integer.toString( counter ) );
//					sqlSB.append( " ON "  );
//					sqlSB.append( " psm_tbl.id = "  );
//					sqlSB.append( "psm_fltrbl_tbl_" );
//					sqlSB.append( Integer.toString( counter ) );
//					sqlSB.append( ".psm_id" );
//				}
//		}
//		///////////
//		sqlSB.append( SQL_WHERE_START );
//		//////////
//		// Process PSM Cutoffs for WHERE
//		{
//				int counter = 0; 
//				for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesPsmAnnotationLevel : psmCutoffValuesList ) {
//					AnnotationTypeDTO srchPgmFilterablePsmAnnotationTypeDTO = searcherCutoffValuesPsmAnnotationLevel.getAnnotationTypeDTO();
//					counter++;
//					sqlSB.append( " AND " );
//					sqlSB.append( " ( " );
//					sqlSB.append( "psm_fltrbl_tbl_" );
//					sqlSB.append( Integer.toString( counter ) );
//					sqlSB.append( ".annotation_type_id = ? AND " );
//					sqlSB.append( "psm_fltrbl_tbl_" );
//					sqlSB.append( Integer.toString( counter ) );
//					sqlSB.append( ".value_double " );
//					if ( srchPgmFilterablePsmAnnotationTypeDTO.getAnnotationTypeFilterableDTO() == null ) {
//						String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + srchPgmFilterablePsmAnnotationTypeDTO.getId();
//						log.error( msg );
//						throw new LimelightInternalErrorException(msg);
//					}
//					if ( srchPgmFilterablePsmAnnotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
//						sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
//					} else {
//						sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
//					}
//					sqlSB.append( " ? " );
//					sqlSB.append( " ) " );
//				}
//		}
//		
//		String sql = sqlSB.toString();
//		
//		try ( Connection connection = super.getDBConnection();
//			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
//			
//			int paramCounter = 0;
//			paramCounter++;
//			preparedStatement.setInt( paramCounter, searchId );
//			paramCounter++;
//			preparedStatement.setInt( paramCounter, reportedPeptideId );
//			// Process PSM Cutoffs for WHERE
//			{
////				if ( ! onlyDefaultPsmCutoffs ) {
//					//  PSM Cutoffs are not the default 
//					for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesPsmAnnotationLevel : psmCutoffValuesList ) {
//						AnnotationTypeDTO srchPgmFilterablePsmAnnotationTypeDTO = searcherCutoffValuesPsmAnnotationLevel.getAnnotationTypeDTO();
//						paramCounter++;
//						preparedStatement.setInt( paramCounter, srchPgmFilterablePsmAnnotationTypeDTO.getId() );
//						paramCounter++;
//						preparedStatement.setDouble( paramCounter, searcherCutoffValuesPsmAnnotationLevel.getAnnotationCutoffValue() );
//					}
////				}
//			}
//
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				while( rs.next() ) {
//					psmIds.add( rs.getLong( "psm_id" ) );
//				}
//			}
//		} catch ( Exception e ) {
//			String msg = "Exception: sql: " + sql;
//			log.error( msg, e );
//			throw e;
//		}
//		return psmIds;
//	}
}
