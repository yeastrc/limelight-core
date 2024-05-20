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
public class ProjectScanFile_For_ProjectId_Searcher extends Limelight_JDBC_Base implements ProjectScanFile_For_ProjectId_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFile_For_ProjectId_Searcher.class );
	
	
	/**
	 * 
	 *
	 */
	public static final class ProjectScanFile_For_ProjectId_Searcher_ResultItem {
		
		private int projectScanFileId;
		private int scanFileId;
		private String scanFilename;

		//  may be null
		private Integer file_object_storage_main_entry_tbl_id;
		
		public int getScanFileId() {
			return scanFileId;
		}
		public String getScanFilename() {
			return scanFilename;
		}
		public int getProjectScanFileId() {
			return projectScanFileId;
		}
		public Integer getFile_object_storage_main_entry_tbl_id() {
			return file_object_storage_main_entry_tbl_id;
		}
	}
	
	
	private static final String SQL = 
			"SELECT project_scan_file_tbl.id AS project_scan_file_tbl__id, project_scan_file_tbl.scan_file_id, project_scan_filename_tbl.scan_filename,"
			+ " file_object_storage_main_entry_tbl.id AS file_object_storage_main_entry_tbl_id "
			+ " FROM project_scan_file_tbl "
			+   " INNER JOIN project_scan_filename_tbl ON project_scan_file_tbl.id = project_scan_filename_tbl.project_scan_file_id"
			+ " LEFT OUTER JOIN scan_file_tbl ON project_scan_file_tbl.scan_file_id = scan_file_tbl.id "
			+ " LEFT OUTER JOIN file_object_storage_main_entry_tbl ON scan_file_tbl.file_object_storage_main_entry_id_fk = file_object_storage_main_entry_tbl.id "		
			+ " WHERE project_id = ? ";
	
	@Override
	public List<ProjectScanFile_For_ProjectId_Searcher_ResultItem> getProjectScanFile_For_ProjectId( int projectId ) throws SQLException {
		
		List<ProjectScanFile_For_ProjectId_Searcher_ResultItem> resultList = new ArrayList<>();
						
		final String querySQL = SQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, projectId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					ProjectScanFile_For_ProjectId_Searcher_ResultItem result = new ProjectScanFile_For_ProjectId_Searcher_ResultItem();
					
					result.projectScanFileId = rs.getInt( "project_scan_file_tbl__id" );
					result.scanFilename = rs.getString( "scan_filename" );
					result.scanFileId = rs.getInt( "scan_file_id" );
					{
						int fieldValue = rs.getInt( "file_object_storage_main_entry_tbl_id" );
						if ( ! rs.wasNull() ) {
							result.file_object_storage_main_entry_tbl_id = fieldValue;
						}
					}
					
					resultList.add(result);
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
