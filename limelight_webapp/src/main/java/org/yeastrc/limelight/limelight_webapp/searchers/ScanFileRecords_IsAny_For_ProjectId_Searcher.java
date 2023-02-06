package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table project_scan_file_tbl
 *
 */
@Component
public class ScanFileRecords_IsAny_For_ProjectId_Searcher extends Limelight_JDBC_Base implements ScanFileRecords_IsAny_For_ProjectId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ScanFileRecords_IsAny_For_ProjectId_Searcher.class );
	
		
	private static final String SQL = 
			"SELECT id  "
			+ " FROM project_scan_file_tbl "
			+ " WHERE project_id = ? "
			+ " LIMIT 1";
	
	
	/**
	 * @param projectId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public boolean isAny_ProjectScanFileRecords_For_ProjectId( int projectId ) throws SQLException {
		
		boolean result = false;
						
		final String querySQL = SQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {

					result = true;
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
