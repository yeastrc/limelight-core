package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;

/**
 *  search_tbl.has_search_sub_groups flag for search id
 */
public class Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher.class);

	private Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher() { }
	private static final Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher _INSTANCE = new Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher();
	public static Limelight_DatabaseCleanup__SearchTbl_Has_SearchSubGroupsFlag_ForSearchId_Searcher getInstance() { return _INSTANCE; }
	
	private static final String get_Data_SQL =
			"SELECT has_search_sub_groups "
			+ " FROM search_tbl "
			+ " WHERE id = ?";
			
	/**
	 * @return
	 * @throws Exception
	 */
	public boolean get_SearchTbl_Has_SearchSubGroupsFlag_ForSearchId( 
			
			int searchId ) throws Exception {

		boolean result = false;

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = get_Data_SQL;
		
		try {
			conn = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			pstmt.setInt( 1, searchId );
			
			rs = pstmt.executeQuery();

			if( rs.next() ) {
				int fieldInt = rs.getInt( "has_search_sub_groups" );
				if ( fieldInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
					result = true;
				}
			}

		} catch ( Exception e ) {
			String msg = "get_AnnotationTypeRecordsCount_ForSearchId(...), searchId: " + searchId + ", sql: " + sql;
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
		return result;
	}
}
