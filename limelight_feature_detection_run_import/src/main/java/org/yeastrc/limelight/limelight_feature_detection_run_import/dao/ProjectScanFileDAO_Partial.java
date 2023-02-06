package org.yeastrc.limelight.limelight_feature_detection_run_import.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * 
 *
 */
public class ProjectScanFileDAO_Partial {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFileDAO_Partial.class );

	private ProjectScanFileDAO_Partial() { }
	public static ProjectScanFileDAO_Partial getInstance() { return new ProjectScanFileDAO_Partial(); }

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	public Integer get_scan_file_id_ById( int id ) throws SQLException {

		Integer result = null;

		final String querySQL = "SELECT scan_file_id FROM project_scan_file_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = rs.getInt( "scan_file_id" );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select subset, id: " + id + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return result;
		
	}
}
