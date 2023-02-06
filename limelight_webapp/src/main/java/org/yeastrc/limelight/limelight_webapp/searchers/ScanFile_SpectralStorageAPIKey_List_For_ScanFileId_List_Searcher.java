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
 * table scan_file_tbl
 *
 */
@Component
public class ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher extends Limelight_JDBC_Base implements ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher.class );
	
	
	/**
	 * 
	 *
	 */
	public static final class ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem {
		
		private int scanFileId;
		private String spectralStorage_API_Key;
		
		public int getScanFileId() {
			return scanFileId;
		}

		public String getSpectralStorage_API_Key() {
			return spectralStorage_API_Key;
		}
	}
	
	
	private static final String SQL = 
			"SELECT id, spectral_storage_api_key FROM scan_file_tbl WHERE id IN ( ";
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_IF#getSpectralStorageAPIKeyList_From_ScanFileIdList(java.util.List)
	 */
	@Override
	public List<ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem> getSpectralStorageAPIKeyList_From_ScanFileIdList( List<Integer> scanFileId_List ) throws SQLException {

		List<ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem> resultList = new ArrayList<>();
		
		if ( scanFileId_List == null || scanFileId_List.isEmpty() ) {
			return resultList;
		}
		
		StringBuilder sqlSB = new StringBuilder( 1000 );
		
		sqlSB.append( SQL );
		
		for ( int counter = 0; counter < scanFileId_List.size(); counter++ ) {
			if ( counter != 0 ) {
				sqlSB.append( ", " );
			}
			sqlSB.append( "?" );
		}
		
		sqlSB.append( " )" );
						
		final String querySQL = sqlSB.toString();
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer scanFileId : scanFileId_List ) {
				counter++;
				preparedStatement.setInt( counter, scanFileId );
			}

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem result = new ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem();
					
					result.scanFileId = rs.getInt( "id" );
					result.spectralStorage_API_Key = rs.getString( "spectral_storage_api_key" );
					
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
