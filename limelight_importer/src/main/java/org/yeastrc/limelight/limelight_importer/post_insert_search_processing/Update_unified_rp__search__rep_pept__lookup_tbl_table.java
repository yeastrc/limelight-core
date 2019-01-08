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
package org.yeastrc.limelight.limelight_importer.post_insert_search_processing;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.dao.UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_shared.shared_searchers.PsmCountForUniquePSM_SearchIdReportedPeptideId_Searcher;

/**
 * Post Search Insert, update table search__rep_pept__lookup_tbl
 *
 */
public class Update_unified_rp__search__rep_pept__lookup_tbl_table {

	private static final Logger log = LoggerFactory.getLogger( Update_unified_rp__search__rep_pept__lookup_tbl_table.class );
	/**
	 * private constructor
	 */
	private Update_unified_rp__search__rep_pept__lookup_tbl_table(){}
	public static Update_unified_rp__search__rep_pept__lookup_tbl_table getInstance() {
		return new Update_unified_rp__search__rep_pept__lookup_tbl_table();
	}

	/**
	 * Post Search Insert, update table search__rep_pept__lookup_tbl
	 * 
	 * Populate search__rep_pept__lookup_tbl.num_unique_psm_at_default_cutoff
	 * since cannot populate while inserting search__rep_pept__lookup_tbl records
	 * 
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @throws Exception 
	 */
	public void update_unified_rp__search__rep_pept__lookup_tbl_table( 
			SearchDTO_Importer search,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws Exception {

		if ( ! search.isHasScanFilenames() ) {
			//  No Scan Filenames data so unable to compute unique psm count
			if ( log.isInfoEnabled() ) {
				log.info( "Skip populating num_unique_psm_at_default_cutoff since no scan filenames provided" );
			}
			return;  // EARLY EXIT
		}
		
		int searchId = search.getId();
		
		//  Commit all inserts executed to this point
		ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
		
		List<Integer> reportedPeptideIdList = getReportedPeptidesForRecordsWhereUniquePSMCountIsNULL( searchId );

		for ( Integer reportedPeptideId : reportedPeptideIdList ) {
			int num_unique_psm_at_default_cutoff = 
					PsmCountForUniquePSM_SearchIdReportedPeptideId_Searcher.getInstance()
					.getPsmCountForUniquePSM_SearchIdReportedPeptideId( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );

			UnifiedRepPep_Search_ReportedPeptide__Lookup__DAO.getInstance()
			.update_num_unique_psm_at_default_cutoff( searchId, reportedPeptideId, num_unique_psm_at_default_cutoff );
		}
		
	}
	
	private static final String getReportedPeptidesForRecordsWhereUniquePSMCountIsNULLSQL = 
			"SELECT reported_peptide_id FROM search__rep_pept__lookup_tbl "
			+ "WHERE search_id = ? AND num_unique_psm_at_default_cutoff IS NULL";

	/**
	 * @param searchId
	 * @return
	 * @throws Exception 
	 */
	private List<Integer> getReportedPeptidesForRecordsWhereUniquePSMCountIsNULL( int searchId ) throws Exception {
		
		List<Integer> resultList = new ArrayList<>();
		
		final String sql = getReportedPeptidesForRecordsWhereUniquePSMCountIsNULLSQL;
		
		try ( Connection conn = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			try ( PreparedStatement pstmt = conn.prepareStatement( sql ) ) {
				pstmt.setInt( 1, searchId );

				try ( ResultSet rs = pstmt.executeQuery() ) {
					while( rs.next() ) {
						resultList.add( rs.getInt( "reported_peptide_id" ) );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql, e );
			throw e;
		}

		return resultList;
	}
	
	

}
