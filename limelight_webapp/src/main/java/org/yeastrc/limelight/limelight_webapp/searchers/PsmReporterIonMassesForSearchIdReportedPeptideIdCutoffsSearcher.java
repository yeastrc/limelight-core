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

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.constants.SearcherGeneralConstants;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * 
 *
 */
@Component
public class PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher extends Limelight_JDBC_Base implements PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	/**
	 * 
	 *
	 */
	public static class PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry {
		
		private long psmId;
		private BigDecimal reporterIonMass;
		
		public long getPsmId() {
			return psmId;
		}
		public BigDecimal getReporterIonMass() {
			return reporterIonMass;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcherIF#getPsmReporterIonMassesForSearchIdReportedPeptideIdCutoffs(int, int, org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public List<PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> getPsmReporterIonMassesForSearchIdReportedPeptideIdCutoffs(
			
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws Exception {
		
		List<PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> resultList = new ArrayList<>();
		
		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		
		//  Create reversed version of list
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList_Reversed = 
				new ArrayList<>( searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList() );
		
		Collections.reverse(psmCutoffValuesList_Reversed);
		
		//  Generate nested sub selects for each annotation type filtering on,
		//     with a innermost subselect of PSM Ids for search id / reported peptide id
				

		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		if ( psmCutoffValuesList_Reversed.isEmpty() ) {
			sqlSB.append( "SELECT psm_tbl.id as psm_id, psm_reporter_ion_mass_tbl.reporter_ion_mass " );
			sqlSB.append( " FROM psm_tbl " );
			sqlSB.append( " INNER JOIN psm_reporter_ion_mass_tbl ON psm_tbl.id = psm_reporter_ion_mass_tbl.psm_id " );
			sqlSB.append( " WHERE psm_tbl.search_id = ? AND psm_tbl.reported_peptide_id = ? " );

			if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
				// Exclude  records where is_decoy = 'true'
				sqlSB.append( " AND is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			}

		} else {
			{
				//  Main Select
				sqlSB.append( " SELECT psm_ids.psm_id as psm_id, psm_reporter_ion_mass_tbl.reporter_ion_mass FROM " ); 
				 		 
				{
					//  Start Subselect

					//  generate sub-selects from outer most to inner most 
			
					for ( int counter = 0; counter < psmCutoffValuesList_Reversed.size(); counter++ ) {

						sqlSB.append( " ( SELECT psm_filterable_annotation_tbl.psm_id FROM psm_filterable_annotation_tbl INNER JOIN " );
					}
					
					//  Add innermost subselect on psm_tbl to get psm ids

					sqlSB.append( " ( SELECT id AS psm_id FROM psm_tbl WHERE search_id = ? AND reported_peptide_id = ? " );
					
					// Include  records where is_independent_decoy = 'true'
					
					if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
						// Exclude  records where is_decoy = 'true'
						sqlSB.append( " AND is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
					}
					
					sqlSB.append( " ) " );
					
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
					
				}  //  End Subselect
				
//				sqlSB.append( " ) " );
			}
//			sqlSB.append( " AS psm_ids " );
			sqlSB.append( " INNER JOIN psm_reporter_ion_mass_tbl ON psm_ids.psm_id = psm_reporter_ion_mass_tbl.psm_id " );
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
				while( rs.next() ) {
					PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry result = new PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry();
					result.psmId = rs.getLong( "psm_id" );
					result.reporterIonMass = rs.getBigDecimal( "reporter_ion_mass" );
					resultList.add( result );
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		}
		return resultList;		
	}

}
