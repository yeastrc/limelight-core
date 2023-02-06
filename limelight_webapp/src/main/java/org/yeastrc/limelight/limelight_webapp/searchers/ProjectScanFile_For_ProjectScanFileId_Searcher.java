package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table project_scan_file_tbl
 *
 */
@Component
public class ProjectScanFile_For_ProjectScanFileId_Searcher extends Limelight_JDBC_Base implements ProjectScanFile_For_ProjectScanFileId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFile_For_ProjectScanFileId_Searcher.class );
	
	private static final String SQL = 
			"SELECT * "
			+ " FROM project_scan_file_tbl "
			+ " WHERE id = ? ";
	
	/**
	 * @param projectScanFileId
	 * @return
	 * @throws SQLException
	 */
	
	@Override
	public Project_ScanFile_DTO get_For_ProjectScanFileId_Searcher( int projectScanFileId ) throws SQLException {
		
		Project_ScanFile_DTO result = null;
						
		final String querySQL = SQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectScanFileId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new Project_ScanFile_DTO();
					result.setId( rs.getInt( "id" ) );
					result.setProjectId( rs.getInt( "project_id" ) );
					result.setScanFileId( rs.getInt( "scan_file_id" ) );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}
}
