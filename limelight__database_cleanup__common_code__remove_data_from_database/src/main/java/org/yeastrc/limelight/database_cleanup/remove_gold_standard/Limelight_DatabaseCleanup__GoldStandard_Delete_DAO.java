package org.yeastrc.limelight.database_cleanup.remove_gold_standard;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;

/**
 * tables: gold_standard_for_scan_file_root_tbl, etc
 * 
 * ONLY Delete
 *
 */
public class Limelight_DatabaseCleanup__GoldStandard_Delete_DAO {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__GoldStandard_Delete_DAO.class);
	private Limelight_DatabaseCleanup__GoldStandard_Delete_DAO() { }
	public static Limelight_DatabaseCleanup__GoldStandard_Delete_DAO getInstance() { return new Limelight_DatabaseCleanup__GoldStandard_Delete_DAO(); }
	
	private static final int RECORD_DELETION_LIMIT = 5000;

	/**
	 * Delete from table gold_standard_for_scan_file_root_tbl
	 * 
	 * Delete the record for the id
	 * @param id
	 * @throws Exception
	 */
	public void delete_From_gold_standard_for_scan_file_root_tbl_Root_Id( int id, Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {

		String sql = "DELETE FROM gold_standard_for_scan_file_root_tbl WHERE id = ?";
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "START: " + new Date()  
					+ ": Deleting record from table 'gold_standard_for_scan_file_root_tbl':  "
					+ " SQL: " + sql );
		}

		int totalRowsUpdated = 0;
		

		try ( Connection dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, id );
				totalRowsUpdated = pstmt.executeUpdate();
			}

		} catch ( Exception e ) {
			log.error( "ERROR: delete_Root_Id(): id: " + id + ", sql: " + sql, e );
			throw e;
		}

		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "END: " + new Date()  
					+ ": Deleting records from table 'gold_standard_for_scan_file_root_tbl':  "
					+ " Number rows deleted: " + totalRowsUpdated );
		}
	}
	

	/**
	 * Delete from table gold_standard_single_entry_tbl
	 * 
	 * Delete the record for the gold_standard_for_scan_file_root_id
	 * @param gold_standard_for_scan_file_root_id
	 * @return number of records deleted
	 * @throws Exception
	 */
	public int delete_gold_standard_single_entry_tbl_FOR_Root_Id( int gold_standard_for_scan_file_root_id, Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {

		String sql = "DELETE FROM gold_standard_single_entry_tbl WHERE gold_standard_for_scan_file_root_id = ? LIMIT " + RECORD_DELETION_LIMIT;
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "START: " + new Date()  
					+ ": Deleting record from table 'gold_standard_single_entry_tbl':  "
					+ " SQL: " + sql );
		}

		int totalRowsUpdated = 0;
		

		try ( Connection dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, gold_standard_for_scan_file_root_id );
				totalRowsUpdated = pstmt.executeUpdate();
			}

		} catch ( Exception e ) {
			log.error( "ERROR: delete_gold_standard_single_entry_tbl_FOR_Root_Id(): gold_standard_for_scan_file_root_id: " + gold_standard_for_scan_file_root_id + ", sql: " + sql, e );
			throw e;
		}

		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "END: " + new Date()  
					+ ": Deleting records from table 'gold_standard_single_entry_tbl':  "
					+ " Number rows deleted: " + totalRowsUpdated );
		}
		
		return totalRowsUpdated;
	}

	/**
	 * Delete from table gold_standard_uploaded_file_contents_tbl
	 * 
	 * Delete the record for the gold_standard_for_scan_file_root_id
	 * @param gold_standard_for_scan_file_root_id
	 * @return number of records deleted
	 * @throws Exception
	 */
	public int delete_gold_standard_uploaded_file_contents_tbl_FOR_Root_Id( int gold_standard_for_scan_file_root_id, Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {

		// Delete only 1 since can be large
		
		String sql = "DELETE FROM gold_standard_uploaded_file_contents_tbl WHERE gold_standard_for_scan_file_root_id = ? LIMIT 1";
		
		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "START: " + new Date()  
					+ ": Deleting record from table 'gold_standard_uploaded_file_contents_tbl':  "
					+ " SQL: " + sql );
		}

		int totalRowsUpdated = 0;
		

		try ( Connection dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, gold_standard_for_scan_file_root_id );
				totalRowsUpdated = pstmt.executeUpdate();
			}

		} catch ( Exception e ) {
			log.error( "ERROR: delete_gold_standard_uploaded_file_contents_tbl_FOR_Root_Id(): gold_standard_for_scan_file_root_id: " + gold_standard_for_scan_file_root_id + ", sql: " + sql, e );
			throw e;
		}

		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "END: " + new Date()  
					+ ": Deleting records from table 'gold_standard_uploaded_file_contents_tbl':  "
					+ " Number rows deleted: " + totalRowsUpdated );
		}
		
		return totalRowsUpdated;
	}
	
}
