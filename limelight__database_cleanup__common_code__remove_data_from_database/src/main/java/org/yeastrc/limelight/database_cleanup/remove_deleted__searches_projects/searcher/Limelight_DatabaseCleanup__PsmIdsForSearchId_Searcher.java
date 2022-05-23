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
 *  psm_tbl.id for search id
 */
public class Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher.class);

	private Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher() { }
	private static final Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher _INSTANCE = new Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher();
	public static Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher getInstance() { return _INSTANCE; }
	
	/**
	 * 
	 *
	 */
	public static class Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher_Result {
		
		List<Long> psmId_List;
		List<Long> psmId_List__has_modifications;
		List<Long> psmId_List__has_open_modifications;
		List<Long> psmId_List__has_reporter_ions;
		
		public List<Long> getPsmId_List() {
			return psmId_List;
		}
		public List<Long> getPsmId_List__has_modifications() {
			return psmId_List__has_modifications;
		}
		public List<Long> getPsmId_List__has_open_modifications() {
			return psmId_List__has_open_modifications;
		}
		public List<Long> getPsmId_List__has_reporter_ions() {
			return psmId_List__has_reporter_ions;
		}
		
	}
	
	private static final String get_PsmIdsForSearchId_SQL =
			"SELECT id, has_modifications, has_open_modifications, has_reporter_ions "
			+ " FROM psm_tbl "
			+ " WHERE search_id = ? ";
	
	// `has_modifications` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Has PSM Dynamic Modifications',
	
	/**
	 * @return
	 * @throws Exception
	 */
	public Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher_Result get_PsmIdsForSearchId( int searchId ) throws Exception {

		List<Long> psmId_List = new ArrayList<>( 100000 );
		List<Long> psmId_List__has_modifications = new ArrayList<>( 100000 );
		List<Long> psmId_List__has_open_modifications = new ArrayList<>( 100000 );
		List<Long> psmId_List__has_reporter_ions = new ArrayList<>( 100000 );

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = get_PsmIdsForSearchId_SQL;
		
		try {
			conn = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			pstmt.setInt( 1, searchId );
			
			rs = pstmt.executeQuery();

			while( rs.next() ) {
				Long psmId = rs.getLong( "id" );
				
				psmId_List.add(psmId);
				
				{
					int fieldInt = rs.getInt( "has_modifications" );
					if ( fieldInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						psmId_List__has_modifications.add(psmId);		
					}
				}
				{
					int fieldInt = rs.getInt( "has_open_modifications" );
					if ( fieldInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						psmId_List__has_open_modifications.add(psmId);		
					}
				}
				{
					int fieldInt = rs.getInt( "has_reporter_ions" );
					if ( fieldInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						psmId_List__has_reporter_ions.add(psmId);		
					}
				}
			}

		} catch ( Exception e ) {
			String msg = "get_PsmIdsForSearchId(...), searchId: " + searchId + ", sql: " + sql;
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
		
		Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher_Result result = new Limelight_DatabaseCleanup__PsmIdsForSearchId_Searcher_Result();
		
		result.psmId_List = psmId_List;
		result.psmId_List__has_modifications = psmId_List__has_modifications;
		result.psmId_List__has_open_modifications = psmId_List__has_open_modifications;
		result.psmId_List__has_reporter_ions = psmId_List__has_reporter_ions;
		
		return result;
	}
}
