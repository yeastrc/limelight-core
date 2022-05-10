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
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.SearchDetailsDTO;

/**
 * table search_details_tbl for Importer
 *
 */
public class SearchDetailsDAO {
	
	private static final Logger log = LoggerFactory.getLogger( SearchDetailsDAO.class );
	
	private SearchDetailsDAO() { }
	public static SearchDetailsDAO getInstance() { return new SearchDetailsDAO(); }
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SearchDetailsDTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			//  Insert 
			saveToDatabase( item, dbConnection );
		}
	}

	private final static String INSERT_SQL = 
			"INSERT INTO search_details_tbl "
			
			+ "(search_id, psm_count, reported_peptide_count, matched_proteins_count, "
			+ " import_elapsed_time__milliseconds, "
			+ " importer_read_limelight_xml_file_elapsed_time__milliseconds,"
			+ " importer_protns_for_pptdes_ttal_procsng_elpsd_tm__milliscnds,"
			+ " search_inserted__wait_for_spectr_time_milliscnds,"
			+ " limelight_xml_file__file_size_bytes, scan_files__total_files_size_bytes ) "
			
			+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

	/**
	 * This will INSERT the given SearchDTO into the database... even if an id is already set.
	 * This will result in a new id being set in the object.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SearchDetailsDTO item, Connection dbConnection ) throws Exception {

		final String sql = INSERT_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

			int counter = 0;
			
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getPsmCount() );
			counter++;
			pstmt.setInt( counter, item.getReportedPeptideCount() );
			counter++;
			pstmt.setInt( counter, item.getMatchedProteinCount() );

			counter++;
			pstmt.setLong( counter, item.getImportElapsedTime_Milliseconds() );
			counter++;
			pstmt.setLong( counter, item.getImporterReadLimelightXmlFileElapsedTime_Milliseconds() );
			counter++;
			pstmt.setLong( counter, item.getImporterProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds() );
			counter++;
			pstmt.setLong( counter, item.getImporter_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds() );
			
			counter++;
			pstmt.setLong( counter, item.getLimelightXML_File__FileSize_Bytes() );
			
			counter++;
			if ( item.getScanFiles_TotalFilesSize_Bytes() != null ) {
				pstmt.setLong( counter, item.getScanFiles_TotalFilesSize_Bytes() );
			} else {
				pstmt.setNull(counter, java.sql.Types.BIGINT );
			}

			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + item, e );
			throw e;
		}
	}
	
}
