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
package org.yeastrc.limelight.limelight_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.slf4j.Logger;

/**
 * table search__rep_pept__lookup_tbl
 *
 */
public class UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO {
	
	private static final Logger log = LoggerFactory.getLogger( UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO.class );
	
	private UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO() { }
	public static UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO getInstance() { return new UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO(); }
	
	/**
	 * Update the num_unique_psm_at_default_cutoff
	 * @param searchId
	 * @param reportedPeptideId
	 * @param num_unique_psm_at_default_cutoff
	 * @throws Exception
	 */
	public void update_num_unique_psm_at_default_cutoff( int searchId, int reportedPeptideId, int num_unique_psm_at_default_cutoff ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			update_num_unique_psm_at_default_cutoff( searchId, reportedPeptideId, num_unique_psm_at_default_cutoff, dbConnection );
		}
	}
	
	private static final String update_num_unique_psm_at_default_cutoffsql = 
			"UPDATE search__rep_pept__lookup_tbl "
			+ " SET num_unique_psm_at_default_cutoff = ? WHERE search_id = ? AND reported_peptide_id = ?";

	/**
	 * Update the num_unique_psm_at_default_cutoff
	 * @param searchId
	 * @param reportedPeptideId
	 * @param num_unique_psm_at_default_cutoff
	 * @throws Exception
	 */	
	public void update_num_unique_psm_at_default_cutoff( int searchId, int reportedPeptideId, int num_unique_psm_at_default_cutoff, Connection dbConnection ) throws Exception {
	
		final String sql = update_num_unique_psm_at_default_cutoffsql;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			pstmt.setInt( 1, num_unique_psm_at_default_cutoff );
			pstmt.setInt( 2, searchId );
			pstmt.setInt( 3, reportedPeptideId );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			log.error( "ERROR: update_num_unique_psm_at_default_cutoff(...) sql: " + sql, e );
			throw e;
		}
	}

}
