package org.yeastrc.limelight.limelight_run_importer.import_and_pipeline_run__cleanup_dirs_files;

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
public class ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers {

	private static final Logger log = LoggerFactory.getLogger( ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers.class );

	//////

	//  private constructor
	private ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers() { }
	
	/**
	 * @return newly created instance
	 */
	public static ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers getSingletonInstance() { 
		return _instance; 
	}
	
	private static ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers _instance = new ImportAndPipelineRun_RemoveDirs_VariousCriteria_Main_Searchers();
	


	private static final String GET_ALL_ID_SQL = 
			
			"SELECT id FROM import_and_pipeline_run_tracking_tbl ";

	/**
	 * Get ALL import tracking item id list
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getAll_TrackingId_InTable_List( ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory ) throws Exception {


		List<Integer> results = new ArrayList<>( 100000 );

		final String sql = GET_ALL_ID_SQL;


		try ( Connection dbConnection = importRunImporterDBConnectionFactory.getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				try ( ResultSet rs = pstmt.executeQuery() ) {

					while ( rs.next() ) {

						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {

			String msg = "getAll_TrackingId_InTable_List(...), sql: " + sql;

			log.error( msg, e );

			throw e;
		}

		return results;
	}

	
	/////

	private static final String GET_STATUS__SUCCESS_FAILED_OVER_3_DAYS_AGO_SQL = 
			
			"SELECT id FROM import_and_pipeline_run_tracking_tbl "
			+ " WHERE status_id IN ( " 
			+ 		FileImportStatus.COMPLETE.value()
			+	  "," + FileImportStatus.FAILED.value()
			+ 	") AND last_updated_date_time <  DATE_SUB(DATE(NOW()), INTERVAL 3 DAY)"
			+ " ORDER BY last_updated_date_time ";

	/**
	 * Get import tracking item id list of items in COMPLETE or FAILED status with last update date 3 days ago
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getAll_TrackingId_For_Status_Success_OR_Fail_LastUpdate_Over_3_DaysAgo( ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory ) throws Exception {


		List<Integer> results = new ArrayList<>( 100000 );

		final String sql = GET_STATUS__SUCCESS_FAILED_OVER_3_DAYS_AGO_SQL;


		try ( Connection dbConnection = importRunImporterDBConnectionFactory.getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				try ( ResultSet rs = pstmt.executeQuery() ) {

					while ( rs.next() ) {

						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {

			String msg = "getAll_TrackingId_For_SuccessAndFail_LastUpdate_Over_3_DaysAgo(...), sql: " + sql;

			log.error( msg, e );

			throw e;
		}

		return results;
	}
			
	////

	private static final String GET_STATUS__INIT_INSERT_PRE_QUEUED_OR_STARTED__OVER_15_DAYS_AGO_SQL = 
			
			"SELECT id FROM import_and_pipeline_run_tracking_tbl "
			+ " WHERE status_id IN ( " 
			+ 		FileImportStatus.INIT_INSERT_PRE_QUEUED.value()
			+       " , "
			+ 		FileImportStatus.STARTED.value()
			+ 	") AND last_updated_date_time <  DATE_SUB(DATE(NOW()), INTERVAL 15 DAY)"
			+ " ORDER BY last_updated_date_time ";

	/**
	 * Get import tracking item id list of items in INIT_INSERT_PRE_QUEUED OR STARTED status with last update date 15 days ago
	 * @return import tracking id list
	 * @throws Exception
	 */
	public List<Integer> getAll_TrackingId_For_Status_INIT_INSERT_PRE_QUEUED_OR_Started_LastUpdate_Over_15_DaysAgo( ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory ) throws Exception {


		List<Integer> results = new ArrayList<>( 100000 );

		final String sql = GET_STATUS__INIT_INSERT_PRE_QUEUED_OR_STARTED__OVER_15_DAYS_AGO_SQL;


		try ( Connection dbConnection = importRunImporterDBConnectionFactory.getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				try ( ResultSet rs = pstmt.executeQuery() ) {

					while ( rs.next() ) {

						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {

			String msg = "getAll_TrackingId_For_Status_Started_LastUpdate_Over_15_DaysAgo(...), sql: " + sql;

			log.error( msg, e );

			throw e;
		}

		return results;
	}
}
