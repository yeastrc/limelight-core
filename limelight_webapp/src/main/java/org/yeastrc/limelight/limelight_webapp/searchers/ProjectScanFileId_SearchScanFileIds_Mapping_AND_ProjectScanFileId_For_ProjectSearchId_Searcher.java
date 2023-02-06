package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * get_ProjectScanFileId_SearchScanFileIds_Mapping_For_ProjectSearchId
 * 
 * table project_scan_filename__search_scan_file__mapping_tbl with join
 *
 */
@Component
public class ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher extends Limelight_JDBC_Base implements ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher.class );
	
	public static class ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result {
		
		List<ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem> resultItemList;

		public List<ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem> getResultItemList() {
			return resultItemList;
		}
	}
	
	public static class ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem {
		
		private int search_scan_file_id;
		private int project_scan_file_id;
		
		public int getProject_scan_file_id() {
			return project_scan_file_id;
		}
		public int getSearch_scan_file_id() {
			return search_scan_file_id;
		}
	}
	
	private static final String SQL = 
			"SELECT DISTINCT project_scan_filename__search_scan_file__mapping_tbl.search_scan_file_id, project_scan_filename_tbl.project_scan_file_id"
			+ " FROM "
			+ " project_scan_filename__search_scan_file__mapping_tbl "
			+ " INNER JOIN project_scan_filename_tbl "
			+    " ON project_scan_filename__search_scan_file__mapping_tbl.project_scan_filename_id = project_scan_filename_tbl.id "
			+ "WHERE "
			+ " project_scan_filename__search_scan_file__mapping_tbl.project_search_id = ? ";
		
	@Override
	public ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result get_ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId( int projectSearchId ) throws SQLException {
		
		ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result result = new ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result();
		
		List<ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem> resultItemList = new ArrayList<>();
		result.resultItemList = resultItemList;
				
		final String querySQL = SQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectSearchId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem resultItem = new ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem();
					
					resultItem.search_scan_file_id = rs.getInt( "search_scan_file_id" );
					resultItem.project_scan_file_id = rs.getInt( "project_scan_file_id" );
					
					resultItemList.add(resultItem);
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}
}
