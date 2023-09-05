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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get For Project Scan File Id - gold_standard_for_scan_file_root_tbl AND gold_standard_for_scan_file_root__project_scnfl_mapping_tbl
 *
 */
@Component
public class GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher extends Limelight_JDBC_Base implements GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_Result {
		private List<GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item> entries;

		public List<GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item> getEntries() {
			return entries;
		}
	}

	/**
	 * 
	 *
	 */
	public static class GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item {
		
		private int id_MappingTbl;
		private String displayLabel;
		private String description;

		public String getDisplayLabel() {
			return displayLabel;
		}
		public String getDescription() {
			return description;
		}
		public int getId_MappingTbl() {
			return id_MappingTbl;
		}
	}
	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.id, gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.display_label, gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.description "
			+ " FROM "
			+ " gold_standard_for_scan_file_root_tbl "
			+ " INNER JOIN gold_standard_for_scan_file_root__project_scnfl_mapping_tbl ON gold_standard_for_scan_file_root_tbl.id = gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.gold_standard_for_scan_file_root_id "
			+ " WHERE "
			+ " gold_standard_for_scan_file_root__project_scnfl_mapping_tbl.project_scan_file_id = ? ";
		

	
	@Override
	public GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_Result  getForProjectScanFileId( int projectScanFileId ) throws Exception {

		GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_Result result = new GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_Result();
		
		List<GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item> entries = new ArrayList<>();
		result.entries = entries;
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectScanFileId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item entry = new GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item();
					entry.id_MappingTbl = rs.getInt( "id" );
					entry.displayLabel = rs.getString( "display_label" );
					entry.description = rs.getString( "description" );
					
					entries.add( entry );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
