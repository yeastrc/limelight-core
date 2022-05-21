package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.shutdown_requested_detection.Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection;


/**
 * Execute the passed in SQL until number of records updated is zero
 *
 */
public class Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated.class);

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated _instance = new Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Execute_SQL_Until_NoRecordsUpdated getInstance() {
		return _instance; 
	}
	
	/**
	 * Execute the passed in SQL until number of records updated is zero
	 * 
	 * @param SQL
	 * @throws Exception
	 */
	public void execute_SQL_Until_NoRecordsUpdated( String SQL, String tableProcessed, Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection dbConnection = null;
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM  ) {

			System.out.println( "START: " + new Date()  
					+ ": Deleting records from table '" + tableProcessed + "':  "
					+ " SQL: " + SQL );
		}
		
		long totalRowsUpdated = 0;
				
		try {
			dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = dbConnection.prepareStatement( SQL );
			
			while (true) {
				if ( Limelight_DatabaseCleanup__WaitForImporterRun_And_ShutdownRequestedDetection.getInstance().waitForImporterRun_And_IsShutdownRequestReceived() ) {
					
					break;
				}

				int rowsUpdated = pstmt.executeUpdate();
				totalRowsUpdated += rowsUpdated;
				if ( rowsUpdated == 0 ) {
					break; //  EXIT loop when no rows updated
				}
			}
	
		} catch ( Exception e ) {
			log.error( "ERROR: , sql: " + SQL, e );
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
		
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM  ) {

			System.out.println( "END: " + new Date()  
					+ ": Deleting records from table '" + tableProcessed + "':  "
					+ " Number rows deleted: " + totalRowsUpdated );
		}
		
	}
}
