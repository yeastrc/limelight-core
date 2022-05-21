package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;

/**
 * Table project_tbl
 *
 */
public class Limelight_DatabaseCleanup__ProjectDAO {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__ProjectDAO.class);
	private Limelight_DatabaseCleanup__ProjectDAO() { }
	public static Limelight_DatabaseCleanup__ProjectDAO getInstance() { return new Limelight_DatabaseCleanup__ProjectDAO(); }

	
	/**
	 * Delete the project_tbl record for the projectId
	 * @param projectId
	 * @throws Exception
	 */
	public void deleteProjectId( int projectId ) throws Exception {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection dbConnection = null;
		String sql = "DELETE FROM project_tbl WHERE id = ?";
				
		try {
			dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = dbConnection.prepareStatement( sql );
			pstmt.setInt( 1, projectId );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			log.error( "ERROR: projectId: " + projectId + ", sql: " + sql, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
			}
			if( pstmt != null ) {
				try { pstmt.close(); } catch( Throwable t ) { ; }
				pstmt = null;
			}
			if( dbConnection != null ) {
				try { dbConnection.close(); } catch( Throwable t ) { ; }
				dbConnection = null;
			}
		}
	}
}
