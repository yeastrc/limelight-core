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
import org.yeastrc.limelight.limelight_shared.dto.Search_To_FastaFileStatistics_Mapping_DTO;

/**
 * table search_to_fasta_file_statistics_mapping_tbl
 *
 */
public class Search_To_FastaFileStatistics_Mapping_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( Search_To_FastaFileStatistics_Mapping_DAO_Importer.class );

	private Search_To_FastaFileStatistics_Mapping_DAO_Importer() { }
	public static Search_To_FastaFileStatistics_Mapping_DAO_Importer getInstance() { return new Search_To_FastaFileStatistics_Mapping_DAO_Importer(); }

	
	private static final String INSERT_SQL =

			"INSERT INTO search_to_fasta_file_statistics_mapping_tbl "
					+ "("
					+ "search_id, fasta_file_statistics_mapping_id "
					+ ") "
					+ "VALUES ( ?, ? )";

	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( Search_To_FastaFileStatistics_Mapping_DTO item ) throws Exception {
		
		final String sql = INSERT_SQL;
		

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				
				int counter = 0;
	
				counter++;
				pstmt.setInt( counter, item.getSearchId() );
				counter++;
				pstmt.setInt( counter, item.getFastaFileStatistics_Mapping_Id() );
		
				pstmt.executeUpdate();
				
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + item, e );
			throw e;
		}
	}

}
