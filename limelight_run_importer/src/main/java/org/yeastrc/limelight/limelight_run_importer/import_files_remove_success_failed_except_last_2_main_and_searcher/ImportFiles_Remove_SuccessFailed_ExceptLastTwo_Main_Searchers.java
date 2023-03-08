package org.yeastrc.limelight.limelight_run_importer.import_files_remove_success_failed_except_last_2_main_and_searcher;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * 
 *
 */
public class ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers {

	private static final Logger log = LoggerFactory.getLogger( ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers.class );

	//////

	//  private constructor
	private ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers() { }
	
	/**
	 * @return newly created instance
	 */
	public static ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers getSingletonInstance() { 
		return _instance; 
	}
	
	private static ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers _instance = new ImportFiles_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers();
	

	/////

	private static final String GET_ID_FOR_STATUS___SQL = 
			
			"SELECT id, last_updated_date_time FROM file_import_tracking_tbl "
			+ " WHERE status_id = ? "
			+ " ORDER BY id ";

	/**
	 * Get import tracking item id list of items in COMPLETE or FAILED status
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getAll_TrackingId_For_Status( FileImportStatus fileImportStatus, ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory ) throws Exception {


		List<Integer> results = new ArrayList<>( 100000 );

		final String sql = GET_ID_FOR_STATUS___SQL;


		try ( Connection dbConnection = importRunImporterDBConnectionFactory.getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				
				pstmt.setInt( 1, fileImportStatus.value() );

				try ( ResultSet rs = pstmt.executeQuery() ) {

					while ( rs.next() ) {

						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {

			String msg = "getAll_TrackingId_For_Status(...), sql: " + sql;

			log.error( msg, e );

			throw e;
		}

		return results;
	}
	
}
