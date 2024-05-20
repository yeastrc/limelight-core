package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table search_scan_file_tbl etc
 * 
 * Returns File Object Storage Table Id if populated in scan_file_tbl
 *
 */
@Component
public class SearchScanFile_AndAssociatedData_For_SearchIds_Searcher extends Limelight_JDBC_Base implements SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( SearchScanFile_AndAssociatedData_For_SearchIds_Searcher.class );
	

	/**
	 * 
	 *
	 */
	public static class SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_Result_Item {
		
		private int id;
		private int searchId;

		private String filename;

		// These may be null
		private Integer scanFileId;
		private Integer file_object_storage_main_entry_tbl_id;
		
		public int getId() {
			return id;
		}
		public int getSearchId() {
			return searchId;
		}
		public String getFilename() {
			return filename;
		}
		public Integer getScanFileId() {
			return scanFileId;
		}
		public Integer getFile_object_storage_main_entry_tbl_id() {
			return file_object_storage_main_entry_tbl_id;
		}
	}
	
	
	private static final String SQL_START =
			"SELECT search_scan_file_tbl.*, file_object_storage_main_entry_tbl.id AS file_object_storage_main_entry_tbl_id "
			+ " FROM search_scan_file_tbl "
			+ " LEFT OUTER JOIN scan_file_tbl ON search_scan_file_tbl.scan_file_id = scan_file_tbl.id "
			+ " LEFT OUTER JOIN file_object_storage_main_entry_tbl ON scan_file_tbl.file_object_storage_main_entry_id_fk = file_object_storage_main_entry_tbl.id ";		
					            
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_IF#getSearchScanFile_For_SearchIds(java.util.Collection)
	 */
	@Override
	public List<SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_Result_Item> getSearchScanFile_For_SearchIds( Collection<Integer> searchIds ) throws SQLException {
		
		List<SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_Result_Item> resultList = new ArrayList<>();
		
		if ( searchIds.isEmpty() ) {
			return resultList;
		}
		
		StringBuilder querySQL_SB = new StringBuilder( 1000 );
		
		querySQL_SB.append( SQL_START );
		
		querySQL_SB.append( " WHERE search_id IN ( " );
		
		for ( int counter = 0; counter < searchIds.size(); counter++ ) {
			if ( counter != 0 ) {
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}
		
		querySQL_SB.append( ")" );  // Close "IN"
		
		final String querySQL = querySQL_SB.toString();
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer id : searchIds ) {
				counter++;
				preparedStatement.setInt( counter, id );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_Result_Item result = new SearchScanFile_AndAssociatedData_For_SearchIds_Searcher_Result_Item();
					result.id = rs.getInt( "id" );
					result.searchId = rs.getInt( "search_id" );
					result.filename = rs.getString( "filename" );
					{
						int fieldValue = rs.getInt( "scan_file_id" );
						if ( ! rs.wasNull() ) {
							result.scanFileId = fieldValue;
						}
					}
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
