package org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.exceptions.LimelightShardCodeInternalErrorException;

/**
 * table aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl
 * 
 * Updates for a single label_ShortKey string (Unique Index in DB)
 *
 */
public class Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO {

	private static final Logger log = LoggerFactory.getLogger( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.class );

	//  private constructor
	private Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO() { }
	/**
	 * @return newly created instance
	 */
	public static Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO getInstance() { 
		return new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO(); 
	}

	/**
	 * Get on Primary Key 
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO getItem_ForId( int id ) throws Exception {
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO item = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "SELECT * FROM aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl WHERE id = ?";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			pstmt.setInt( 1, id );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				item = populateResultObject( rs );
			}
			if( rs.next() ) {
				String msg = "getItem_ForId(...) found > 1 record for id: " + id;
				log.error(msg);
				throw new LimelightShardCodeInternalErrorException(msg);
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql, e );
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
	 * 
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO getItem_ForLabelShortKey( String label_ShortKey ) throws Exception {
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO item = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "SELECT * FROM aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl WHERE label_short_key = ?";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			pstmt.setString( 1, label_ShortKey );
			rs = pstmt.executeQuery();
			if( rs.next() ) {
				item = populateResultObject( rs );
			}
			if( rs.next() ) {
				String msg = "getItem_ForLabelShortKey(...) found > 1 record for label_ShortKey: " + label_ShortKey;
				log.error(msg);
				throw new LimelightShardCodeInternalErrorException(msg);
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql, e );
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
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO populateResultObject(ResultSet rs) throws SQLException {
		
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO returnItem = new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO();
		
		returnItem.setId( rs.getInt( "id" ) );

		returnItem.setLabel_ShortKey( rs.getString( "label_short_key" ) );
		returnItem.setLabel( rs.getString( "label" ) );
		
		{
			int fieldValue = rs.getInt( "updates_complete" );

			if ( fieldValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {

				returnItem.setUpdatesComplete( true );
			} else {
				returnItem.setUpdatesComplete( false );
			}
		}
		
	
		return returnItem;
	}

	

	private static final String INSERT_SQL = "INSERT INTO aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl "

			+ " ( label_short_key, label, updates_complete )"

			+ " VALUES ( ?, ?, ? )"
			
			+ "ON DUPLICATE KEY UPDATE dummy_on_duplicate_update = ?";

	/**
	 * Save the associated data to the database
	 * @param item
	 * @throws Exception
	 */
	public void save( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO item ) throws Exception {
				
		final String sql = INSERT_SQL;

		try ( Connection dbConnection = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				int counter = 0;

				counter++;
				pstmt.setString( counter, item.getLabel_ShortKey() );
				counter++;
				pstmt.setString( counter, item.getLabel() );
				
				counter++;
				if ( item.isUpdatesComplete() ) {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
				} else {
					pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
				}

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
	

	/**
	 * set field 'updates_complete' to 1 for true for id
	 * @param id
	 * @throws Exception
	 */
	public void update_To_Set_UpdatesComplete( int id ) throws Exception {
				
		final String sql = "UPDATE aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl SET updates_complete = "
				+ Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
				+ ", updates_complete_date_time = NOW() "
				+ " WHERE id = ?";

		try ( Connection dbConnection = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				int counter = 0;

				counter++;
				pstmt.setInt( counter, id );
				
				pstmt.executeUpdate();
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: update_To_Set_UpdatesComplete(id): sql: " + sql, e );
			throw e;
		} finally {
			
		}
		
	}
}
