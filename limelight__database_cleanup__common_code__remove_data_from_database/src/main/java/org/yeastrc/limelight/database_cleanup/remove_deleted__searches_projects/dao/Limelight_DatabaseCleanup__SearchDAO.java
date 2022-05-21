package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;

/**
 * table search_tbl
 *
 */
public class Limelight_DatabaseCleanup__SearchDAO {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__SearchDAO.class);
	private Limelight_DatabaseCleanup__SearchDAO() { }
	public static Limelight_DatabaseCleanup__SearchDAO getInstance() { return new Limelight_DatabaseCleanup__SearchDAO(); }
	
	/**
	 * Update the status_id associated with this search
	 * @param searchId
	 * @param status
	 * @throws Exception
	 */
	public void updateStatus( int searchId, SearchRecordStatus status ) throws Exception {
		
		try ( Connection dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection() ) {
			
			String sql = "UPDATE search_tbl SET status_id = ?, import_end_timestamp = NOW() WHERE id = ?";
		
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, status.value() );
				pstmt.setInt( 2, searchId );
				pstmt.executeUpdate();
			} catch ( Exception e ) {
				log.error( "ERROR: sql: " + sql, e );
				throw e;
			}
		}
	}

	/**
	 * Delete the search record for the searchId
	 * @param searchId
	 * @throws Exception
	 */
	public void deleteSearchId( int searchId, Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {

		String sql = "DELETE FROM search_tbl WHERE id = ?";
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "START: " + new Date()  
					+ ": Deleting record from table 'search_tbl':  "
					+ " SQL: " + sql );
		}

		int totalRowsUpdated = 0;
		

		try ( Connection dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, searchId );
				totalRowsUpdated = pstmt.executeUpdate();
			}

		} catch ( Exception e ) {
			log.error( "ERROR: deleteSearchId(): searchId: " + searchId + ", sql: " + sql, e );
			throw e;
		}

		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "END: " + new Date()  
					+ ": Deleting records from table 'search':  "
					+ " Number rows deleted: " + totalRowsUpdated );
		}
	}

}
