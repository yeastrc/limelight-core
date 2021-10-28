package org.yeastrc.limelight.limelight_webapp.searchers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class SpectralStorageAPIKeyForSearchId_Searcher extends Limelight_JDBC_Base implements SpectralStorageAPIKeyForSearchId_SearcherIF {

    private static final Logger log = LoggerFactory.getLogger( SpectralStorageAPIKeyForSearchId_Searcher.class );
    
    public static class SpectralStorageAPIKeyForSearchId_Searcher_Result {
    	
    	private List<SpectralStorageAPIKeyForSearchId_Searcher_Result_Item> resultItems;

		public List<SpectralStorageAPIKeyForSearchId_Searcher_Result_Item> getResultItems() {
			return resultItems;
		}
    }
    

    public static class SpectralStorageAPIKeyForSearchId_Searcher_Result_Item {
    	
    	private int searchScanFileId;
    	private String spectralStorageAPIKey;
    	
		public int getSearchScanFileId() {
			return searchScanFileId;
		}
		public String getSpectralStorageAPIKey() {
			return spectralStorageAPIKey;
		}
    }

    private static final String QUERY_SQL =
            "SELECT a.spectral_storage_api_key, b.id AS search_scan_file_id "
            + " FROM scan_file_tbl AS a "
            + " INNER JOIN search_scan_file_tbl AS b ON a.id = b.scan_file_id "
                    + " WHERE b.search_id = ?";

    @Override
    public SpectralStorageAPIKeyForSearchId_Searcher_Result get_SearchScanFileId_SpectralStorageAPIKey_Entries_ForSearchId(int searchId) throws SQLException {

    	SpectralStorageAPIKeyForSearchId_Searcher_Result result = new SpectralStorageAPIKeyForSearchId_Searcher_Result();
    	
    	List<SpectralStorageAPIKeyForSearchId_Searcher_Result_Item> resultItems = new ArrayList<>();
    	result.resultItems = resultItems;

        final String querySQL = QUERY_SQL;

		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
            preparedStatement.setInt( 1, searchId );

            try ( ResultSet rs = preparedStatement.executeQuery() ) {
                while ( rs.next() ) {
                	SpectralStorageAPIKeyForSearchId_Searcher_Result_Item item = new SpectralStorageAPIKeyForSearchId_Searcher_Result_Item();
                	resultItems.add(item);
                	
                    item.spectralStorageAPIKey = rs.getString( "spectral_storage_api_key" );
                    item.searchScanFileId = rs.getInt( "search_scan_file_id" );
                }
            }
        } catch ( SQLException e ) {
            log.error( "error running SQL: " + querySQL, e );
            throw e;
        }

        return result;
    }
}
