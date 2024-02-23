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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * !!!!   is_decoy  is not returned.  Assumed that PSMs with is_decoy = 1 will NOT be retrieved
 * 
 */
@Component
public class PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher extends Limelight_JDBC_Base implements PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher.class );

	/**
	 * 
	 *
	 */
	public static class PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry {

    	long psmId;
    	int charge;
    	int scanNumber;
    	Integer searchScanFileId; // Can be null
		Float retentionTimeSeconds;
    	Double precursor_M_Over_Z;
    	boolean hasModifications;
    	boolean hasOpenModifications;
    	boolean hasReporterIons;
    	boolean independentDecoyPSM;
    	
    	//  is_decoy  is not returned.  Assumed that PSMs with is_decoy = 1 will NOT be retrieved
    	
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
		public boolean isIndependentDecoyPSM() {
			return independentDecoyPSM;
		}
	}
	
	private static final String SELECT_START_SQL = 
			" SELECT "
			+ " id AS psm_id, charge, scan_number, search_scan_file_id, has_modifications, has_open_modifications, has_reporter_ions, "
			+ " is_independent_decoy, "    // skip 'is_decoy' 
			+ " precursor_retention_time, precursor_m_z "
			+ " FROM psm_tbl WHERE id IN ( ";
		

	/**
	 * !!!  is_decoy  is not returned.  Assumed that PSMs with is_decoy = 1 will NOT be retrieved
	 * 
	 * @param psmIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry> getPsmTblData_Exclude_is_decoy_For_PsmIds( List<Long> psmIds ) throws Exception {
		
		if ( psmIds == null || psmIds.isEmpty() ) {
			return new ArrayList<>();
		}
		
		List<PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry> psm_Entries = new ArrayList<>( psmIds.size() );
		
		StringBuilder sql_Partial_SB = new StringBuilder( psmIds.size() * 5 );
		
		for ( int counter = 1; counter <= psmIds.size(); counter++ ) {
			if ( counter != 1 ) {
				sql_Partial_SB.append( "," );
			}
			sql_Partial_SB.append( "?" );
		}
		
		String sql = SELECT_START_SQL + sql_Partial_SB.toString() + " ) ";
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			
			for ( Long psmId : psmIds ) {
				counter++;
				preparedStatement.setLong( counter, psmId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					
					PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry psm_Entry = new PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry();
					
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
					
					//   is_decoy  is not returned.  Assumed that PSMs with is_decoy = 1 will NOT be retrieved
					
					{
						int value = rs.getInt( "is_independent_decoy" );
						if ( value == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psm_Entry.independentDecoyPSM = true;
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
