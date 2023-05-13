package org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;
import org.yeastrc.limelight.limelight_shared.exceptions.LimelightShardCodeInternalErrorException;

/**
 * table aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl
 * 
 * Updates for a single root id and search id (Primary Index in DB)
 * 
 * Searcher Get Largest search_id in search_tbl not in this table for rootTableId
 *
 */
public class Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher {

	private static final Logger log = LoggerFactory.getLogger( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.class );

	//  private constructor
	private Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher() { }
	/**
	 * @return newly created instance
	 */
	public static Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher getInstance() { 
		return new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher(); 
	}

	private static final String getLargestSearchId_LessThanSearchIdPassedIn__SQL =
			" SELECT MAX(id) AS max_id FROM search_tbl "
			+ " WHERE "
			+ " id < ? "
			+ " AND status_id = "
			+ SearchRecordStatus.IMPORT_COMPLETE_VIEW.value();
	
	/**
	 * Searcher Get Largest search_id in search_tbl where search status import complete and less than input searchId_MustBeLessThan
	 * @param searchId_MustBeLessThan
	 * @return
	 * @throws Exception
	 */
	public Integer getLargestSearchId_LessThanSearchIdPassedIn( int searchId_MustBeLessThan ) throws Exception {
		
		Integer result_SearchId = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		final String sql = getLargestSearchId_LessThanSearchIdPassedIn__SQL;
		
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			pstmt.setInt( 1, searchId_MustBeLessThan );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				int fieldValue = rs.getInt( "max_id" );
				if ( ! rs.wasNull() ) {
					result_SearchId = fieldValue;
				}
			}
			if( rs.next() ) {
				String msg = "getLargestSearchId_LessThanSearchIdPassedIn(...) found > 1 record. ";
				log.error(msg);
				throw new LimelightShardCodeInternalErrorException(msg);
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getLargestSearchId_LessThanSearchIdPassedIn(...)  sql: " + sql, e );
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
			if( conn != null ) {
				try { conn.close(); } catch( Throwable t ) { ; }
				conn = null;
			}
		}
		return result_SearchId;
	}
	

	private static final String getLargestSearchId__SQL =
			"SELECT MAX(id) AS max_id FROM search_tbl "
			+ "WHERE status_id = "
			+ SearchRecordStatus.IMPORT_COMPLETE_VIEW.value();
	
	/**
	 * Searcher Get Largest search_id in search_tbl where search status import complete
	 * @param searchId_MustBeLessThan
	 * @return
	 * @throws Exception
	 */
	public Integer getLargestSearchId() throws Exception {
		
		Integer result_SearchId = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		final String sql = getLargestSearchId__SQL;
		
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				int fieldValue = rs.getInt( "max_id" );
				if ( ! rs.wasNull() ) {
					result_SearchId = fieldValue;
				}
			}
			if( rs.next() ) {
				String msg = "getLargestSearchId(...) found > 1 record. ";
				log.error(msg);
				throw new LimelightShardCodeInternalErrorException(msg);
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getLargestSearchId(...)  sql: " + sql, e );
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
			if( conn != null ) {
				try { conn.close(); } catch( Throwable t ) { ; }
				conn = null;
			}
		}
		return result_SearchId;
	}
}
