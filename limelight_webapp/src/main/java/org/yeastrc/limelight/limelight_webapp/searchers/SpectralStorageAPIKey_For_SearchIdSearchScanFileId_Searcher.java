package org.yeastrc.limelight.limelight_webapp.searchers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class SpectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher extends Limelight_JDBC_Base implements SpectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher_IF {

    private static final Logger log = LoggerFactory.getLogger( SpectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher.class );
    
    private static final String QUERY_SQL =
            "SELECT a.spectral_storage_api_key "
            + " FROM scan_file_tbl AS a "
            + " INNER JOIN search_scan_file_tbl AS b ON a.id = b.scan_file_id "
                    + " WHERE b.search_id = ? AND b.id = ?";

    
    /**
     * @param searchId
     * @param searchScanFileId
     * @return = null if not found
     * @throws SQLException
     */
    @Override
	public String get_SpectralStorageAPIKey_For_SearchId_SearchScanFileId(
    		int searchId,
    		int searchScanFileId
    		) throws SQLException {

    	String result = null;
    	
        final String querySQL = QUERY_SQL;

		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
            preparedStatement.setInt( 1, searchId );
            preparedStatement.setInt( 2, searchScanFileId );

            try ( ResultSet rs = preparedStatement.executeQuery() ) {
                if ( rs.next() ) {
                	
                    result = rs.getString( "spectral_storage_api_key" );
                }
            }
        } catch ( SQLException e ) {
            log.error( "error running SQL: " + querySQL, e );
            throw e;
        }

        return result;
    }
}
