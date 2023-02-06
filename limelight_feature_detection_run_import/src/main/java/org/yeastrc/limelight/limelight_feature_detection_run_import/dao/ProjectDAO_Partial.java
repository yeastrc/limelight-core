package org.yeastrc.limelight.limelight_feature_detection_run_import.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dto.ProjectDTO_Partial;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;

/**
 * 
 *
 */
public class ProjectDAO_Partial {

	private static final Logger log = LoggerFactory.getLogger( ProjectDAO_Partial.class );

	private ProjectDAO_Partial() { }
	public static ProjectDAO_Partial getInstance() { return new ProjectDAO_Partial(); }

	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	public ProjectDTO_Partial getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( int projectId ) throws SQLException {

		ProjectDTO_Partial returnItem = null;
		
		final String querySQL = "SELECT project_locked, public_access_level, public_access_locked, enabled, marked_for_deletion FROM project_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					returnItem = new ProjectDTO_Partial();
					returnItem.setId( projectId );
					{
						int fieldIntValue = rs.getInt( "project_locked" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							returnItem.setProjectLocked( true );
						}
					}
					{
						int fieldIntValue = rs.getInt( "enabled" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							returnItem.setEnabled( true );
						}
					}
					{
						int fieldIntValue = rs.getInt( "marked_for_deletion" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							returnItem.setMarkedForDeletion( true );
						}
					}
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select subset, projectId: " + projectId + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
		
	}
}
