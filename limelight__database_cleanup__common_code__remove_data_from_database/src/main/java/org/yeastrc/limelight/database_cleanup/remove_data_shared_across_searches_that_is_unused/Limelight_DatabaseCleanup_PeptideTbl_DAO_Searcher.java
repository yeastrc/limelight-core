package org.yeastrc.limelight.database_cleanup.remove_data_shared_across_searches_that_is_unused;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;

/**
 * table peptide_tbl
 *
 */
public class Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher.class);
	private Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher() { }
	public static Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher getInstance() { return new Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher(); }

	private static final int NUMBER_DAYS_WAIT_DELETE_AFTER_last_used_in_search_import_VALUE = 1;  //  Wait x days after last_used_in_search_import last updated.

	
	private static final String SELECT_COUNT_START = "SELECT COUNT( DISTINCT peptide_tbl.id ) AS count FROM peptide_tbl  INNER JOIN (  ";

	private static final String DELETE_START = "DELETE peptide_tbl FROM peptide_tbl INNER JOIN (  ";
	
	
	private static final String INNER_SUB_SELECT = 
			"SELECT peptide_tbl.id FROM peptide_tbl "
					+ " LEFT OUTER JOIN search_reported_peptide_tbl ON peptide_tbl.id = search_reported_peptide_tbl.peptide_id "
					+ " WHERE "
					+ " last_used_in_search_import < DATE_SUB( NOW(), INTERVAL " + NUMBER_DAYS_WAIT_DELETE_AFTER_last_used_in_search_import_VALUE + " day ) "
					+ " AND "
					+ " search_reported_peptide_tbl.peptide_id IS NULL ";  // not found in search_reported_peptide_tbl
	
	private static final String INNER_SUB_SELECT__PEPTIDE_ID_RANGE = " AND peptide_tbl.id > ? AND peptide_tbl.id <= ? "; 
	
	private static final String LIMIT_CLAUSE = " LIMIT ? ";
	
	private static final String OUTER_DELETE_FINAL_PART = ") AS ids_to_delete ON ids_to_delete.id = peptide_tbl.id";
	

	/**
	 * @return
	 * @throws Exception
	 */
	public int getMaxId( ) throws Exception {

		int result = 0;

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = "SELECT MAX(id) AS max_id FROM peptide_tbl ";
		
		try {
			conn = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			rs = pstmt.executeQuery();

			if( rs.next() ) {
				result = rs.getInt( "max_id" );
			} else {
				
			}

		} catch ( Exception e ) {
			String msg = "getMaxId(...), sql: " + sql;
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


	/**
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getIdsToDelete( ) throws Exception {

		List<Integer> resultList = new ArrayList<>();

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = INNER_SUB_SELECT;
		
		try {
			conn = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			rs = pstmt.executeQuery();

			while( rs.next() ) {
				resultList.add( rs.getInt( "id" ) );
			}

		} catch ( Exception e ) {
			String msg = "getIdsToDelete(...), sql: " + sql;
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
		return resultList;
	}
	

	/**
	 * 
	 *
	 */
	public static class Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Params {
		
		private Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom;
		
		private int peptideId_Start_Excluding;
		private int peptideId_End_Including;
		private int deleteLimit;
		
		public void setCallFrom(Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom) {
			this.callFrom = callFrom;
		}
		public void setPeptideId_Start_Excluding(int peptideId_Start_Excluding) {
			this.peptideId_Start_Excluding = peptideId_Start_Excluding;
		}
		public void setPeptideId_End_Including(int peptideId_End_Including) {
			this.peptideId_End_Including = peptideId_End_Including;
		}
		public void setDeleteLimit(int deleteLimit) {
			this.deleteLimit = deleteLimit;
		}
	}

	/**
	 * 
	 *
	 */
	public static class Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Result {
		
		private int rowsDeleted_Count;

		public int getRowsDeleted_Count() {
			return rowsDeleted_Count;
		}
	}


	/**
	 * @param callFrom
	 * @return rowCountDeleted
	 * @throws Exception
	 */
	public Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Result deleteBlock( Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Params params ) throws Exception {

		String sql = DELETE_START + INNER_SUB_SELECT + INNER_SUB_SELECT__PEPTIDE_ID_RANGE + LIMIT_CLAUSE + OUTER_DELETE_FINAL_PART;
		
		if ( params.callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "START: " + new Date()  
					+ ": Deleting record from table 'peptide_tbl':  "
					+ ", peptideId_Start_Excluding: " + params.peptideId_Start_Excluding
					+ ", peptideId_End_Including: " + params.peptideId_End_Including
					+ ", deleteLimit: " + params.deleteLimit
					+ " SQL: " + sql );
		}

		int rowsDeleted_Count = 0;
		

		try ( Connection dbConnection = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				
				pstmt.setInt( 1, params.peptideId_Start_Excluding );
				pstmt.setInt( 2, params.peptideId_End_Including );
				pstmt.setInt( 3, params.deleteLimit );
				
				rowsDeleted_Count = pstmt.executeUpdate();
			}

		} catch ( Exception e ) {
			log.error( "ERROR: deleteSearchId(): sql: " + sql, e );
			throw e;
		}

		if ( params.callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			
			System.out.println( "END: " + new Date()  
					+ ": Deleting records from table 'search':  "
					+ " Number rows deleted: " + rowsDeleted_Count );
		}
		
		Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Result result = new Limelight_DatabaseCleanup_PeptideTbl_DAO_Searcher_deleteBlock_Result();
		result.rowsDeleted_Count = rowsDeleted_Count;
		
		return result;
	}
	

}
