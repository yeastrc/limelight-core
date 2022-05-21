package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;

/**
 *  project_search.id to delete
 */
public class Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher.class);

	private Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher() { }
	private static final Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher _INSTANCE = new Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher();
	public static Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher getInstance() { return _INSTANCE; }
	
	private static final int NUMBER_DAYS_WAIT_DELETE_FOR_SEARCH_TABLE_STATUS_ID_NOT___IMPORT_COMPLETE_AND_VIEW = 10;  //  Wait 10 days for import complete

	private static final int NUMBER_DAYS_WAIT_DELETE_AFTER_PROJECT_DELETED = 2;  //  Wait 2 days after delete project

	private static final String getProjectSearchIdsToDeleteSQL =
			"SELECT project_search_tbl.id "
			+ " FROM project_search_tbl "
			+ " LEFT OUTER JOIN search_tbl ON project_search_tbl.search_id = search_tbl.id"
			+ " LEFT OUTER JOIN project_tbl ON project_search_tbl.project_id = project_tbl.id "
			+ " WHERE "
			
			//  searches stuck in importing are covered in the 'search_tbl' table checking 
			
			//  project_search_tbl.status_id is in a completed but failed or some kind of to delete state
			+ " ( "
			+ 	" project_search_tbl.status_id IN "
			+ 		"( " 
			+ 		SearchRecordStatus.IMPORT_FAIL.value()
			+ 		", "
			+ 		SearchRecordStatus.IMPORT_CANCELED_INCOMPLETE.value() //  NOT used for project_search_tbl
			+ 		", "
			+ 		SearchRecordStatus.MARKED_FOR_DELETION.value()  //  NOT used for project_search_tbl
			+ 		", "
			+ 		SearchRecordStatus.DELETION_IN_PROGRESS.value() //  NOT used for project_search_tbl
			+   	" ) "
			+   " ) "
			
			//  		or  'search_tbl' table record exists and search_tbl.status_id is 'importing' or 'importing waiting ...' ( those status are before complete) and X days have passed
			//				(This removes search where import that died or was killed)
			+ " OR "
			+ " ( "
			+ 		" search_tbl.id IS NOT NULL AND search_tbl.status_id IN  (" + SearchRecordStatus.IMPORTING.value() + ", " + SearchRecordStatus.IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS.value() + " ) "
			+ 				" AND  last_modified_date_time < DATE_SUB( NOW(), INTERVAL " + NUMBER_DAYS_WAIT_DELETE_FOR_SEARCH_TABLE_STATUS_ID_NOT___IMPORT_COMPLETE_AND_VIEW + " day )"
			+ " )"
					
			//  		or 'project_tbl' table record exists and project is marked for deletion - User deleted Project
			+ " OR "
			+ " ( "
			+ 		" project_tbl.id IS NOT NULL "
			+ 		" AND project_tbl.marked_for_deletion = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE 
			+		" AND "
			+ 			"( "
			+ 				"project_tbl.marked_for_deletion_timestamp IS NULL"
			+ 			" OR project_tbl.marked_for_deletion_timestamp < DATE_SUB( NOW(), INTERVAL " + NUMBER_DAYS_WAIT_DELETE_AFTER_PROJECT_DELETED + " day )"
			+ 			" ) "
			+ " ) "
			
			+ " ORDER BY project_search_tbl.id";
			
	/**
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getProjectSearchIdsToDelete( ) throws Exception {

		List<Integer> resultList = new ArrayList<>();

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = getProjectSearchIdsToDeleteSQL;
		
//		System.out.println( "**");
//		System.out.println( "Searching for records in table 'project_search_tbl' to remove for cleanup.  SQL:\n" + sql );
//		System.out.println( "**");
		
		try {
			conn = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			rs = pstmt.executeQuery();

			while( rs.next() ) {
				resultList.add( rs.getInt( "id" ) );
			}

		} catch ( Exception e ) {
			String msg = "getProjectSearchIdsToDelete(...), sql: " + sql;
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
