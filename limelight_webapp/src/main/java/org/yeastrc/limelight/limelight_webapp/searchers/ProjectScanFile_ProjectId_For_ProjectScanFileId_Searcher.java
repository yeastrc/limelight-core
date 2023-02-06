package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table project_scan_file_tbl
 *
 */
@Component
public class ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher extends Limelight_JDBC_Base implements ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher.class );
	
	private static final String SQL = 
			"SELECT project_id "
			+ " FROM project_scan_file_tbl "
			+ " WHERE id = ? ";
	
	/**
	 * @param projectScanFileId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public Integer get_ProjectId_For_ProjectScanFileId_Searcher( int projectScanFileId ) throws SQLException {
		
		Integer result = null;
						
		final String querySQL = SQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectScanFileId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					
					result = rs.getInt( "project_id" );
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
