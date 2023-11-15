package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table project_scan_filename_tbl
 *
 */
@Component
public class ProjectScanFilename_For_ProjectScanFileId_Set_Searcher extends Limelight_JDBC_Base implements ProjectScanFilename_For_ProjectScanFileId_Set_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFilename_For_ProjectScanFileId_Set_Searcher.class );
	
	private static final String SQL_START = 
			"SELECT * "
			+ " FROM project_scan_filename_tbl "
			+ " WHERE project_scan_file_id IN ( ";
	
	/**
	 * @param projectScanFileId_Set
	 * @return
	 * @throws SQLException
	 */
	
	@Override
	public List<Project_ScanFilename_DTO> get_For_ProjectScanFileId_Set_Searcher( Set<Integer> projectScanFileId_Set ) throws SQLException {
		
		List<Project_ScanFilename_DTO>  resultList = new ArrayList<>( projectScanFileId_Set.size() );
		
		StringBuilder sqlSB = new StringBuilder( 1000 );
		sqlSB.append( SQL_START );
		
		for ( int counter = 1; counter <= projectScanFileId_Set.size(); counter++ ) {
			if ( counter > 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( ")" );  // Close the "IN"
						
		final String querySQL = sqlSB.toString();
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer projectScanFileId : projectScanFileId_Set ) {
				
				counter++;
				preparedStatement.setInt( counter, projectScanFileId );
			}

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					Project_ScanFilename_DTO result = new Project_ScanFilename_DTO();
					result.setId( rs.getInt( "id" ) );
					result.setProjectScanFileId( rs.getInt( "project_scan_file_id" ) );
					result.setScanFilename( rs.getString( "scan_filename" ) );
					
					resultList.add( result );
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
		
		return resultList;
	}
}
