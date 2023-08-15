package org.yeastrc.limelight.database_cleanup.remove_feature_detection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;

/**
 * table feature_detection_root_tbl
 * 
 * Find records where NOT marked fully inserted after X days
 *
 */
public class Limelight_DatabaseCleanup__FeatureDetectionRoot_NotMappedToAnyProject_Searcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__FeatureDetectionRoot_NotMappedToAnyProject_Searcher.class);
	private Limelight_DatabaseCleanup__FeatureDetectionRoot_NotMappedToAnyProject_Searcher() { }
	public static Limelight_DatabaseCleanup__FeatureDetectionRoot_NotMappedToAnyProject_Searcher getInstance() { return new Limelight_DatabaseCleanup__FeatureDetectionRoot_NotMappedToAnyProject_Searcher(); }

	private static final int NUMBER_DAYS_WAIT_DELETE_AFTER_RECORD_FULLY_INSERTED = 4;  //  Wait x days after created.  By this point it is clear that the import failed
	

	private static final String getIdsToDeleteSQL =
			"SELECT feature_detection_root_tbl.id "
			+ " FROM feature_detection_root_tbl "
			+ " LEFT OUTER JOIN feature_detection_root__project_scnfl_mapping_tbl"
			+ 		" ON feature_detection_root_tbl.id = feature_detection_root__project_scnfl_mapping_tbl.feature_detection_root_id "
			+ " WHERE "
			+ " feature_detection_root_tbl.entry_fully_inserted = " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
			+ " AND feature_detection_root_tbl.entry_fully_inserted_date_time < DATE_SUB( NOW(), INTERVAL " + NUMBER_DAYS_WAIT_DELETE_AFTER_RECORD_FULLY_INSERTED + " day ) "
			+ " AND feature_detection_root__project_scnfl_mapping_tbl.feature_detection_root_id IS NULL "
			+ " ORDER BY id";
			
	/**
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getIdsToDelete( ) throws Exception {

		List<Integer> resultList = new ArrayList<>();

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = getIdsToDeleteSQL;
		
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

}
