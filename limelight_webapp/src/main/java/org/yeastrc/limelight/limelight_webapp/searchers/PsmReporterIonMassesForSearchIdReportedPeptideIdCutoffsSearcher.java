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
public class PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher extends Limelight_JDBC_Base implements PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher.class );
	
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
			
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {
		
		List<PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> resultList = new ArrayList<>();
		
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList = 
				searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList();

		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		if ( psmCutoffValuesList.isEmpty() ) {
			sqlSB.append( "SELECT psm_tbl.id as psm_id, psm_reporter_ion_mass_tbl.reporter_ion_mass " );
			sqlSB.append( " FROM psm_tbl " );
			sqlSB.append( " INNER JOIN psm_reporter_ion_mass_tbl ON psm_tbl.id = psm_reporter_ion_mass_tbl.psm_id " );
			sqlSB.append( " WHERE psm_tbl.search_id = ? AND psm_tbl.reported_peptide_id = ? " );
			
		} else {
			{
				//  Main Select
				sqlSB.append( " SELECT filterable_psm_ids.psm_id as psm_id, psm_reporter_ion_mass_tbl.reporter_ion_mass FROM ( " ); 
				 		 
				{
					//  Start Subselect

					sqlSB.append( " SELECT tbl_1.psm_id FROM  " );

					for ( int counter = 1; counter <= psmCutoffValuesList.size(); counter++ ) {
						if ( counter > 1 ) {
							sqlSB.append( " INNER JOIN " );
						}
						sqlSB.append( "  psm_filterable_annotation__lookup_tbl AS tbl_" );
						sqlSB.append( Integer.toString( counter ) );
						if ( counter > 1 ) {
							sqlSB.append( " ON tbl_1.search_id = tbl_" );
							sqlSB.append( Integer.toString( counter ) );
							sqlSB.append( ".search_id" );
							sqlSB.append( " AND tbl_1.reported_peptide_id = tbl_" );
							sqlSB.append( Integer.toString( counter ) );
							sqlSB.append( ".reported_peptide_id" );
							sqlSB.append( " AND tbl_1.psm_id = tbl_" );
							sqlSB.append( Integer.toString( counter ) );
							sqlSB.append( ".psm_id" );
						}
					}
					sqlSB.append( " WHERE ( " );
					{
						int counter = 0; 
						for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList ) {
							counter++;
							if ( counter > 1 ) {
								sqlSB.append( " ) AND ( " );
							}
							sqlSB.append( "tbl_" );
							sqlSB.append( Integer.toString( counter ) );
							sqlSB.append( ".search_id = ? AND " );
							sqlSB.append( "tbl_" );
							sqlSB.append( Integer.toString( counter ) );
							sqlSB.append( ".reported_peptide_id = ? AND " );
							sqlSB.append( "tbl_" );
							sqlSB.append( Integer.toString( counter ) );
							sqlSB.append( ".annotation_type_id = ? AND " );
							sqlSB.append( "tbl_" );
							sqlSB.append( Integer.toString( counter ) );
							sqlSB.append( ".value_double " );
							if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO() == null ) {
								String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
								log.error( msg );
								throw new LimelightInternalErrorException(msg);
							}
							if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
								sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
							} else {
								sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
							}
							sqlSB.append( " ? " );
						}
					}
					sqlSB.append( " ) " );
					
				}  //  End Subselect
				
				sqlSB.append( " ) " );
			}
			sqlSB.append( " AS filterable_psm_ids " );
			sqlSB.append( " INNER JOIN psm_reporter_ion_mass_tbl ON filterable_psm_ids.psm_id = psm_reporter_ion_mass_tbl.psm_id " );
		}
		
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			if ( psmCutoffValuesList.isEmpty() ) {
				counter++;
				preparedStatement.setInt( counter, searchId );
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			} else {
				for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList ) {
					counter++;
					preparedStatement.setInt( counter, searchId );
					counter++;
					preparedStatement.setInt( counter, reportedPeptideId );
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
