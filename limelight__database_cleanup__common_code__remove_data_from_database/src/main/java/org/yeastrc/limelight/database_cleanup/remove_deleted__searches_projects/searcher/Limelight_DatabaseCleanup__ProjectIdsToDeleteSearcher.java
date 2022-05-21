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

/**
 *  project.id to delete
 */
public class Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher.class);

	private Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher() { }
	private static final Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher _INSTANCE = new Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher();
	public static Limelight_DatabaseCleanup__ProjectIdsToDeleteSearcher getInstance() { return _INSTANCE; }
	
	private static final int NUMBER_DAYS_WAIT_DELETE_AFTER_PROJECT_DELETED = 4;  //  Wait 2 days after delete project

	private static final String getProjectIdsToDeleteSQL =
			"SELECT DISTINCT project_tbl.id "
			+ " FROM project_tbl "
			+ " LEFT OUTER JOIN project_search_tbl ON project_search_tbl.project_id = project_tbl.id "
			+ " WHERE "
			
			//			NO project_search_tbl associated record
			+ 		" project_search_tbl.id IS NULL "
			
			//  		'project_tbl' table record exists and project is marked for deletion and selected at least X days - User deleted Project
			
			+ 		" AND project_tbl.marked_for_deletion = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE 
			+		" AND "
			+ 			"( "
			+ 				"project_tbl.marked_for_deletion_timestamp IS NULL"
			+ 				" OR project_tbl.marked_for_deletion_timestamp < DATE_SUB( NOW(), INTERVAL " + NUMBER_DAYS_WAIT_DELETE_AFTER_PROJECT_DELETED + " day )"
			+ 			" ) "
			
			+ " ORDER BY project_tbl.id";
			
	/**
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getProjectIdsToDelete( ) throws Exception {

		List<Integer> resultList = new ArrayList<>();

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = getProjectIdsToDeleteSQL;
		
//		System.out.println( "**");
//		System.out.println( "Searching for records in table 'project_tbl' to remove for cleanup.  SQL:\n" + sql );
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
