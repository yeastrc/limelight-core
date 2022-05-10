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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * 
 *
 */
@Component
public class PsmTblData_ForSearchIdSearcher extends Limelight_JDBC_Base implements PsmTblData_ForSearchIdSearcher_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmTblData_ForSearchIdSearcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	/**
	 * 
	 *
	 */
	public static class PsmTblData_ForSearchIdSearcher_ResultEntry {

    	long psmId;
    	int reportedPeptideId;
    	int charge;
    	int scanNumber;
    	Integer searchScanFileId; // Can be null
		Float retentionTimeSeconds;
    	Double precursor_M_Over_Z;
    	boolean hasModifications;
    	boolean hasOpenModifications;
    	boolean hasReporterIons;
    	boolean independentDecoyPSM;
    	boolean decoyPSM;
    	
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
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public boolean isIndependentDecoyPSM() {
			return independentDecoyPSM;
		}
		public boolean isDecoyPSM() {
			return decoyPSM;
		}
	}
	
	private static final String SELECT_SQL = 
			" SELECT id AS psm_id, reported_peptide_id, charge, scan_number, search_scan_file_id, has_modifications, has_open_modifications, has_reporter_ions, "
					+ " is_independent_decoy, is_decoy, "
					+ "precursor_retention_time, precursor_m_z "
					+ " FROM psm_tbl WHERE search_id = ? "; //  Conditionally add to WHERE  clause

	/**
	 * !!!  Excludes psm_tbl with is_decoy = 1 unless param 'include_DecoyPSMs' is true
	 * 
	 * @param searchId
	 * @return
	 * @throws Exception 
	 */
	@Override
	public List<PsmTblData_ForSearchIdSearcher_ResultEntry> getPsmTblData_ForSearchId(
			
			int searchId, boolean include_DecoyPSMs ) throws Exception {
		
		List<PsmTblData_ForSearchIdSearcher_ResultEntry> psm_Entries = new ArrayList<>();

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		
		String sql = SELECT_SQL;
				
		if ( ( ! include_DecoyPSMs ) && searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
			// Exclude  records where is_decoy = 'true'
			sql += " AND is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE;
		}
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, searchId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					
					PsmTblData_ForSearchIdSearcher_ResultEntry psm_Entry = new PsmTblData_ForSearchIdSearcher_ResultEntry();
					
					psm_Entry.psmId = rs.getLong( "psm_id" );
					psm_Entry.reportedPeptideId = rs.getInt( "reported_peptide_id" );
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
						int value = rs.getInt( "is_decoy" );
						if ( value == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psm_Entry.decoyPSM = true;
						}
					}
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
		} catch ( Exception e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		}
		return psm_Entries;		
	}

}
