package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table search_scan_file_tbl with join
 *
 */
@Component
public class SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher extends Limelight_JDBC_Base implements SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher.class );
	
	public static class SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_Result {
		
		List<SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem> resultItemList;

		public List<SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem> getResultItemList() {
			return resultItemList;
		}
	}
	
	public static class SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem {
		
		private int search_scan_file_id;
		private String search_scan_filename;
		private int project_scan_file_id;
		
		public String getSearch_scan_filename() {
			return search_scan_filename;
		}
		public int getProject_scan_file_id() {
			return project_scan_file_id;
		}
		public int getSearch_scan_file_id() {
			return search_scan_file_id;
		}
	}
	
	private static final String SQL_START = 
			"SELECT search_scan_file_tbl.id AS search_scan_file_id, search_scan_file_tbl.filename, project_scan_filename_tbl.project_scan_file_id"
			+ " FROM search_scan_file_tbl "
			+ " INNER JOIN project_scan_filename__search_scan_file__mapping_tbl "
			+    " ON search_scan_file_tbl.id = project_scan_filename__search_scan_file__mapping_tbl.search_scan_file_id "
			+ " INNER JOIN project_scan_filename_tbl "
			+    " ON project_scan_filename__search_scan_file__mapping_tbl.project_scan_filename_id = project_scan_filename_tbl.id "
			+ "WHERE "
			+ " search_scan_file_tbl.search_id = ? "
			+ " AND project_scan_filename_tbl.project_scan_file_id IN ( ";
		
	@Override
	public SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_Result getSearchScanFile_For_SearchId_ProjectScanFileIds( int searchId, Collection<Integer> projectScanFileIds ) throws SQLException {
		
		SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_Result result = new SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_Result();
		
		List<SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem> resultItemList = new ArrayList<>();
		result.resultItemList = resultItemList;
		
		if ( projectScanFileIds.isEmpty() ) {
			return result;
		}
		
		StringBuilder querySQL_SB = new StringBuilder( 1000 );

		querySQL_SB.append( SQL_START );
		
		for ( int counter = 0; counter < projectScanFileIds.size(); counter++ ) {
			if ( counter != 0 ) {
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}
		
		querySQL_SB.append( ")" );  // Close "IN"
		
		final String querySQL = querySQL_SB.toString();
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, searchId );
			
			for ( Integer projectScanFileId : projectScanFileIds ) {
				counter++;
				preparedStatement.setInt( counter, projectScanFileId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem resultItem = new SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem();
					
					resultItem.search_scan_file_id = rs.getInt( "search_scan_file_id" );
					resultItem.search_scan_filename = rs.getString( "filename" );
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
