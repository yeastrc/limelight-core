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
public class ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers {

	private static final Logger log = LoggerFactory.getLogger( ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers.class );

	//////

	//  private constructor
	private ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers() { }
	
	/**
	 * @return newly created instance
	 */
	public static ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers getSingletonInstance() { 
		return _instance; 
	}
	
	private static ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers _instance = new ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers();
	

	/////

	private static final String GET_ID_FOR_STATUS___SQL = 
			
			"SELECT id FROM import_and_pipeline_run_tracking_tbl "
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



	/**
	 * 
	 *
	 */
	public static class ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem {
		
		int trackingId;
		int trackingRunId;
		int trackingRun_SubStatusId;
		
		public int getTrackingId() {
			return trackingId;
		}
		public int getTrackingRunId() {
			return trackingRunId;
		}
		public int getTrackingRun_SubStatusId() {
			return trackingRun_SubStatusId;
		}
		
	}

	/////

	private static final String SQL__getAll_TrackingId_TrackingRunId_SubStatus_For_Status = 
			
			"SELECT import_and_pipeline_run_tracking_tbl.id AS import_and_pipeline_run_tracking_tbl_id, "
			+ " import_and_pipeline_run_tracking_run_tbl.id AS import_and_pipeline_run_tracking_run_tbl_id, import_and_pipeline_run_tracking_run_tbl.sub_status_id "
			+ ""
			+ " FROM import_and_pipeline_run_tracking_tbl "
			+ " INNER JOIN import_and_pipeline_run_tracking_run_tbl ON import_and_pipeline_run_tracking_tbl.id = import_and_pipeline_run_tracking_run_tbl.import_and_pipeline_run_tracking_id "
			+ " WHERE import_and_pipeline_run_tracking_tbl.status_id = ?";

	/**
	 * Get import tracking item id list of items in COMPLETE or FAILED status
	 * @return
	 * @throws Exception
	 */
	public List<ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem> 
	
	getAll_TrackingId_TrackingRunId_SubStatus_For_Status( 
			
			FileImportStatus fileImportStatus, ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory ) throws Exception {


		List<ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem> results = new ArrayList<>( 100000 );

		final String sql = SQL__getAll_TrackingId_TrackingRunId_SubStatus_For_Status;


		try ( Connection dbConnection = importRunImporterDBConnectionFactory.getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				
				pstmt.setInt( 1, fileImportStatus.value() );

				try ( ResultSet rs = pstmt.executeQuery() ) {

					while ( rs.next() ) {

						ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem result = new ImportAndPipelineRun_Remove_SuccessFailed_ExceptLastTwo_Main_Searchers__getAll_TrackingId_TrackingRunId_SubStatus_For_Status_ResultItem();

						result.trackingId = rs.getInt( "import_and_pipeline_run_tracking_tbl_id" );
						result.trackingRunId = rs.getInt( "import_and_pipeline_run_tracking_run_tbl_id" );
						result.trackingRun_SubStatusId = rs.getInt( "sub_status_id" );
						
						results.add( result );
					}
				}
			}
		} catch ( Exception e ) {

			String msg = "getAll_TrackingId_TrackingRunId_SubStatus_For_Status(...), sql: " + sql;

			log.error( msg, e );

			throw e;
		}

		return results;
	}
	

}
