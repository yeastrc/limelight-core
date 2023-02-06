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
public class ScanFileDAO_Partial {

	private static final Logger log = LoggerFactory.getLogger( ScanFileDAO_Partial.class );

	private ScanFileDAO_Partial() { }
	public static ScanFileDAO_Partial getInstance() { return new ScanFileDAO_Partial(); }

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	public String getSpectralStorageAPIKeyById( int id ) throws SQLException {

		String result = null;

		final String querySQL = "SELECT spectral_storage_api_key FROM scan_file_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = rs.getString( "spectral_storage_api_key" );
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
