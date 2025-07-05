package org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.exceptions.LimelightShardCodeInternalErrorException;

/**
 * table aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl
 * 
 * Updates for a single root id and search id (Primary Index in DB)
 *
 */
public class Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO {

	private static final Logger log = LoggerFactory.getLogger( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.class );

	//  private constructor
	private Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO() { }
	/**
	 * @return newly created instance
	 */
	public static Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO getInstance() { 
		return new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO(); 
	}

	/**
	 * Get on Primary Key
	 * @param rootTableId
	 * @param searchId
	 * @return
	 * @throws Exception
	 */
	public Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO getItem_ForRootIdSearchId( int rootTableId, int searchId ) throws Exception {
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO item = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "SELECT * FROM aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl WHERE root_table_id_fk = ? AND search_id = ?";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			pstmt.setInt( 1, rootTableId );
			pstmt.setInt( 2, searchId );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				item = populateResultObject( rs );
			}
			if( rs.next() ) {
				String msg = "getItem_ForRootIdSearchId(...) found > 1 record for rootTableId: " + rootTableId + ", searchId: " + searchId;
				log.error(msg);
				throw new LimelightShardCodeInternalErrorException(msg);
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getItem_ForRootIdSearchId(...)  sql: " + sql, e );
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
		return item;
	}

	/**
	 * Get on Primary Key
	 * @param rootTableId
	 * @param searchId
	 * @return
	 * @throws Exception
	 */
	public List<Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO> getItemList_For_RootId_SearchIds( int rootTableId, Set<Integer> searchIds ) throws Exception {
		
		List<Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO> resultList = new ArrayList<>( searchIds.size() );
		
		if ( searchIds.isEmpty() ) {
			return resultList;
		}
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		StringBuilder sqlSB = new StringBuilder( "SELECT * FROM aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl WHERE root_table_id_fk = ? AND search_id IN " );
		
		
		sqlSB.append( "(" );
		
		for ( int counter = 0; counter < searchIds.size(); counter++ ) {
			if ( counter > 0 ) {
				sqlSB.append( "," );	
			}
			sqlSB.append( "?" );
		}
		
		sqlSB.append( ")" );
		
		final String sql = sqlSB.toString();
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			int counter = 0;
			
			counter++;
			pstmt.setInt( counter, rootTableId );
			
			for ( Integer searchId : searchIds ) {
			
				counter++;
				pstmt.setInt( counter, searchId );
			}
			
			rs = pstmt.executeQuery();
			while( rs.next() ) {
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO item = populateResultObject( rs );
				resultList.add( item );
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getItem_ForRootIdSearchId(...)  sql: " + sql, e );
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
		return resultList;
	}

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO populateResultObject(ResultSet rs) throws SQLException {
		
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO returnItem = new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO();
		
		returnItem.setRootTableId( rs.getInt( "root_table_id_fk" ) );
		returnItem.setSearchId( rs.getInt( "search_id" ) );
	
		return returnItem;
	}


	/**
	 * 
	 * @param rootTableId
	 * @return
	 * @throws Exception
	 */
	public Integer get_SmallestSearchId_ForRootId( int rootTableId ) throws Exception {
		Integer result = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "SELECT MIN(search_id) AS search_id_min FROM aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl WHERE root_table_id_fk = ?";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			pstmt.setInt( 1, rootTableId );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				int fieldValue = rs.getInt( "search_id_min" );
				if ( ! rs.wasNull() ) {
					//  'MIN' returns null when no records exist
					result = fieldValue;
				}
			}
			if( rs.next() ) {
				String msg = "get_SmallestSearchId_ForRootId(...) found > 1 record for rootTableId: " + rootTableId;
				log.error(msg);
				throw new LimelightShardCodeInternalErrorException(msg);
			}
		} catch ( Exception e ) {
			log.error( "ERROR: get_SmallestSearchId_ForRootId(...)  sql: " + sql, e );
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
		return result;
	}

	private static final String INSERT_SQL = "INSERT INTO aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl "

			+ " ( root_table_id_fk, search_id )"

			+ " VALUES ( ?, ? )"
			
			+ "ON DUPLICATE KEY UPDATE dummy_on_duplicate_update = ?";

	/**
	 * Save the associated data to the database
	 * @param item
	 * @throws Exception
	 */
	public void save( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO item ) throws Exception {
				
		final String sql = INSERT_SQL;

		try ( Connection dbConnection = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				int counter = 0;

				counter++;
				pstmt.setInt( counter, item.getRootTableId() );
				counter++;
				pstmt.setInt( counter, item.getSearchId() );
				
				counter++;
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );

				pstmt.executeUpdate();
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql + "\nData to save: " + item, e );
			throw e;
		} finally {
			
		}
		
	}
}
