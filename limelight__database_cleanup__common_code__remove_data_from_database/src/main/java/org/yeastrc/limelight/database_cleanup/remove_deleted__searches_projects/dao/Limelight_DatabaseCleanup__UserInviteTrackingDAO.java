package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;

/**
 * Table user_invite_tracking_tbl
 *
 */
public class Limelight_DatabaseCleanup__UserInviteTrackingDAO {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__UserInviteTrackingDAO.class);
	private Limelight_DatabaseCleanup__UserInviteTrackingDAO() { }
	public static Limelight_DatabaseCleanup__UserInviteTrackingDAO getInstance() { return new Limelight_DatabaseCleanup__UserInviteTrackingDAO(); }

	
	/**
	 * Delete the user_invite_tracking_tbl records for the projectId in field invited_project_id
	 * @param projectId
	 * @throws Exception
	 */
	public void deleteProjectId( int projectId ) throws Exception {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection dbConnection = null;
		String sql = "DELETE FROM user_invite_tracking_tbl WHERE invited_project_id = ?";
				
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
