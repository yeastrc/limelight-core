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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
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
public class PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher extends Limelight_JDBC_Base implements PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher.class );
	
	/**
	 * 
	 *
	 */
	public static class PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry {

    	long psmId;
    	int charge;
    	int scanNumber;
    	Integer searchScanFileId; // Can be null
		Float retentionTimeSeconds;
    	Double precursor_M_Over_Z;
    	boolean hasModifications;
    	boolean hasOpenModifications;
    	boolean hasReporterIons;
    	
		public long getPsmId() {
			return psmId;
		}
		public int getCharge() {
			return charge;
		}
		public int getScanNumber() {
			return scanNumber;
		}
		public Integer getSearchScanFileId() {
			return searchScanFileId;
		}
		public Float getRetentionTimeSeconds() {
			return retentionTimeSeconds;
		}
		public Double getPrecursor_M_Over_Z() {
			return precursor_M_Over_Z;
		}
		public boolean isHasModifications() {
			return hasModifications;
		}
		public boolean isHasOpenModifications() {
			return hasOpenModifications;
		}
		public boolean isHasReporterIons() {
			return hasReporterIons;
		}
	}
	
	private static final String SELECT_START_SQL = 
			" SELECT id AS psm_id, charge, scan_number, search_scan_file_id, has_modifications, has_open_modifications, has_reporter_ions, precursor_retention_time, precursor_m_z ";
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_IF#getPsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffs(int, int, org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public List<PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> getPsmTblData_ForSearchIdReportedPeptideIdCutoffs(
			
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {
		
		List<PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> psm_Entries = new ArrayList<>();

		//  Create reversed version of list
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList_Reversed = 
				new ArrayList<>( searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList() );
		
		Collections.reverse(psmCutoffValuesList_Reversed);
		
		//  Generate nested sub selects for each annotation type filtering on,
		//     with a innermost subselect of PSM Ids for search id / reported peptide id
				
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( SELECT_START_SQL );
		
		if ( psmCutoffValuesList_Reversed.isEmpty() ) {

			sqlSB.append( " FROM psm_tbl WHERE search_id = ? AND reported_peptide_id = ?" ); 
		} else {
			
			sqlSB.append( " FROM psm_tbl " );
			
			sqlSB.append( " INNER JOIN ( " );
			
			{
				//  Query to get psm_id values
					
				sqlSB.append( " SELECT psm_id FROM  " );
	
				//  generate sub-selects from outer most to inner most 
		
				for ( int counter = 0; counter < psmCutoffValuesList_Reversed.size(); counter++ ) {
	
					sqlSB.append( " ( SELECT psm_filterable_annotation_tbl.psm_id FROM psm_filterable_annotation_tbl INNER JOIN " );
				}
				
				//  Add innermost subselect on psm_tbl to get psm ids
				
				sqlSB.append( " ( SELECT id AS psm_id FROM psm_tbl WHERE search_id = ? AND reported_peptide_id = ? ) " );
	
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
			}
			
			//  Finish outermost INNER JOIN to psm_tbl
			
			sqlSB.append( " ) as psm_ids  ON psm_tbl.id = psm_ids.psm_id " );
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
					
					PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry psm_Entry = new PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry();
					
					psm_Entry.psmId = rs.getLong( "psm_id" );
					psm_Entry.charge = rs.getInt( "charge" );
					psm_Entry.scanNumber = rs.getInt( "scan_number" );
					{
						int value = rs.getInt( "search_scan_file_id" );
						if ( ! rs.wasNull() ) {
							psm_Entry.searchScanFileId = value;
						}
					}
					{
						int value = rs.getInt( "has_modifications" );
						if ( value == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psm_Entry.hasModifications = true;
						}
					}
					{
						int value = rs.getInt( "has_open_modifications" );
						if ( value == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psm_Entry.hasOpenModifications = true;
						}
					}
					{
						int value = rs.getInt( "has_reporter_ions" );
						if ( value == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psm_Entry.hasReporterIons = true;
						}
					}
					{
						float value = rs.getFloat( "precursor_retention_time" );
						if ( ! rs.wasNull() ) {
							psm_Entry.retentionTimeSeconds = value;
						}
					}
					{
						double value = rs.getDouble( "precursor_m_z" );
						if ( ! rs.wasNull() ) {
							psm_Entry.precursor_M_Over_Z = value;
						}
					}

					psm_Entries.add(psm_Entry);
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		}
		return psm_Entries;		
	}

}
