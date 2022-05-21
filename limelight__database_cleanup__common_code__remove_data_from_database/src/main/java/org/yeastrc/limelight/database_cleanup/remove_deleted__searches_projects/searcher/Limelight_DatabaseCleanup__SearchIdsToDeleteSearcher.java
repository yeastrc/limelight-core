package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;

/**
 *  search.id to delete
 */
public class Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher.class);

	private static final int NUMBER_DAYS_WAIT_DELETE_FOR_SEARCH_TABLE_STATUS_ID_NOT___IMPORT_COMPLETE_AND_VIEW = 10;  //  Wait 10 days for import complete

	private Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher() { }
	private static final Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher _INSTANCE = new Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher();
	public static Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher getInstance() { return _INSTANCE; }

	private static final String getSearchIdsToDeleteSQL =
			"SELECT search_tbl.id "
			+ " FROM search_tbl "
			+ "  LEFT OUTER JOIN project_search_tbl ON search_tbl.id = project_search_tbl.search_id "
			+ " WHERE "
			
			//  no project_search_tbl record found
			+ " project_search_tbl.id IS NULL "
			
			+ " AND "
			
			+ " ( "
			//   			Search has NOT finished Importing so wait X days before removal
			+   " ( "
			+ 		" search_tbl.status_id IN  (" + SearchRecordStatus.IMPORTING.value() + ", " + SearchRecordStatus.IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS.value() + " ) "
			+ 				" AND  last_modified_date_time < DATE_SUB( NOW(), INTERVAL " + NUMBER_DAYS_WAIT_DELETE_FOR_SEARCH_TABLE_STATUS_ID_NOT___IMPORT_COMPLETE_AND_VIEW + " day )"
			+   " )"
			+   " OR "
			//				Search HAS finished Importing so delete immediately
			+   " ( "
			+ 		" search_tbl.status_id NOT IN  (" + SearchRecordStatus.IMPORTING.value() + ", " + SearchRecordStatus.IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS.value() + " ) "
			+   " )"
			+ " )"		
			
			+ " ORDER BY search_tbl.id";
			
	/**
	 * @param projectSearchId
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getSearchIdsToDelete( ) throws Exception {

		List<Integer> resultList = new ArrayList<>();

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = getSearchIdsToDeleteSQL;
		
//		System.out.println( "**");
//		System.out.println( "Searching for records in table 'search_tbl' to remove for cleanup.  SQL:\n" + sql );
//		System.out.println( "**");

		try {
			conn = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			rs = pstmt.executeQuery();

			while( rs.next() ) {
				resultList.add( rs.getInt( "id" ) );
			}

		} catch ( Exception e ) {
			String msg = "getSearchIdsToDelete(...), sql: " + sql;
			log.error( msg, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
				if( pstmt != null ) {
					try { pstmt.close(); } catch( Throwable t ) { ; }
					pstmt = null;
				}
				if( conn != null ) {
					try { conn.close(); } catch( Throwable t ) { ; }
					conn = null;
				}
			}
		}
		return resultList;
	}
}
