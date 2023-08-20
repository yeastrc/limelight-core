package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * table srch__rep_pept_descriptive_annotation__insert_id_tbl
 *
 */
public class DB_Insert_SearchReportedPeptideDescriptiveAnnotation_InsertId_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchReportedPeptideDescriptiveAnnotation_InsertId_DAO.class );

	private DB_Insert_SearchReportedPeptideDescriptiveAnnotation_InsertId_DAO() { }
	public static DB_Insert_SearchReportedPeptideDescriptiveAnnotation_InsertId_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_SearchReportedPeptideDescriptiveAnnotation_InsertId_DAO singletonInstance = new DB_Insert_SearchReportedPeptideDescriptiveAnnotation_InsertId_DAO();
	

	/**
	 * @throws Exception 
	 * 
	 */
	public DB_Insert_SearchReportedPeptideDescriptiveAnnotation__BatchIds_Start_End getNextBatch_IDs( int batchSize ) throws Exception {
		
		final int try_Count_Max = 10;
		
		int try_Counter = 0;
				
		while ( true ) {
			
			try_Counter++;
			
			if ( try_Counter > try_Count_Max ) {
				String msg = "getNextBatch_IDs(): try_Counter > try_Count_Max. try_Count_Max: " + try_Count_Max;
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}


			// get srch__rep_pept_descriptive_annotation__insert_id_tbl and then 'advance' srch__rep_pept_descriptive_annotation__insert_id_tbl by adding DEFAULT_INSERT_ENTRIES_ARRAY_SIZE to it.

			Long id_LastInserted = get_LastId_InsertId_Table();

			if ( id_LastInserted == null ) {
				//  No entries in DB

				//  Insert zero into db

				try {
					insertId_Value_InsertId_Table( 0 );
				} catch (Exception e) {
					//  Swallow Exception since may be duplicate
				}

				id_LastInserted = get_LastId_InsertId_Table();  // Run query again.  Another Importer may have inserted a different value

				if ( id_LastInserted == null ) {
					String msg = "No psmId_LastInserted after insert value zero.  Investigate error message for insertId_Value(...)";
					log.error(msg);
					throw new LimelightImporterInternalException(msg);
				}

				if ( id_LastInserted.longValue() != 0 ) {
					// There is now a value in the table that is not the zero entry just inserted so delete the zero entry

					deleteId_InsertId_Table(0);
				}
			}

			//  Now have a value for id_LastInserted.  This may be updated by another
			
			long id_New = id_LastInserted + batchSize; // New "Last Inserted PSM Id"
			
			long id_Existing = id_LastInserted;

			if ( updateId_InsertId_Table( id_New, id_Existing ) ) {
				
				DB_Insert_SearchReportedPeptideDescriptiveAnnotation__BatchIds_Start_End result = new DB_Insert_SearchReportedPeptideDescriptiveAnnotation__BatchIds_Start_End();
				
				result.id_Start = id_LastInserted + 1;
				result.id_End = id_LastInserted + batchSize; // New "Last Inserted PSM Id"
				
				return result;
			}
			
			
			Thread.sleep(1005);  // wait before retry
			
		}
		
		
	}
	

	/**
	 * @return null when no record found
	 * @throws Exception
	 */
	private Long get_LastId_InsertId_Table() throws Exception {
		
		final String sql = "SELECT id FROM srch__rep_pept_descriptive_annotation__insert_id_tbl ORDER BY id DESC LIMIT 1";
		
		Long id_LastInserted = null;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				
				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						id_LastInserted = rs.getLong( "id" );
					}
				}
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: get_Id_InsertId_Table(...) sql: " + sql, e );
			throw e;
		}
		
		return id_LastInserted;
	}

	/**
	 * 
	 * 
	 * @param id
	 * @throws Exception 
	 */
	private boolean updateId_InsertId_Table( long id_New, long id_Existing ) throws Exception {
		
		boolean any_RecordsUpdated = false;
		
		final String sql = "UPDATE srch__rep_pept_descriptive_annotation__insert_id_tbl SET id = ? WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setLong( 1, id_New );
				pstmt.setLong( 2, id_Existing );

				int updateCount = pstmt.executeUpdate();
				
				if ( updateCount > 0 ) {
					
					any_RecordsUpdated = true;
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: updateId_InsertId_Table(id). id_New: " + id_New + ", id_Existing: " + id_Existing + ", sql: " + sql, e );
			throw e;
		}
		
		return any_RecordsUpdated;
	}
	
	/**
	 * Insert into 'side' table to insert zero when table is empty
	 * @throws Exception 
	 */
	private void insertId_Value_InsertId_Table(long id) throws Exception {
		
		final String INSERT_GET_ID_SQL = "INSERT INTO srch__rep_pept_descriptive_annotation__insert_id_tbl ( id ) VALUES ( ? )";
		final String sql = INSERT_GET_ID_SQL;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setLong( 1, id );
				
				int updateCount = pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "Exception Ignored since May be duplicate.  Logged in case there is a different error to research: insertId_Value(...): id: " + id + ", sql: " + sql, e );
			throw e;
		}

	}

	/**
	 * 
	 * 
	 * @param id
	 * @throws Exception 
	 */
	private void deleteId_InsertId_Table( long id ) throws Exception {
		
		final String DELETE_SQL = "DELETE FROM srch__rep_pept_descriptive_annotation__insert_id_tbl WHERE id = ?";
		final String sql = DELETE_SQL;
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setLong( 1, id );

				int updateCount = pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: deleteId(id). id: " + id + ", sql: " + sql, e );
			throw e;
		}
	}
	
	

	/**
	 * 
	 *
	 */
	public static class DB_Insert_SearchReportedPeptideDescriptiveAnnotation__BatchIds_Start_End {
		
		private long id_Start;
		private long id_End;
		
		public long getId_Start() {
			return id_Start;
		}
		public long getId_End() {
			return id_End;
		}
	}

}
