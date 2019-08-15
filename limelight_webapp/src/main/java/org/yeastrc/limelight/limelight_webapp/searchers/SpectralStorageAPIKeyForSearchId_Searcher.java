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

    private static final String QUERY_SQL =
            "SELECT a.spectral_storage_api_key FROM scan_file_tbl AS a INNER JOIN search_scan_file_tbl AS b " +
                    "ON a.id = b.scan_file_id WHERE b.search_id = ?";

    @Override
    public List<String> getSpectralStorageAPIKeyForSearchId(int searchId) throws SQLException {

        List<String> resultList = new ArrayList<>();

        final String querySQL = QUERY_SQL;

		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
            preparedStatement.setInt( 1, searchId );

            try ( ResultSet rs = preparedStatement.executeQuery() ) {
                while ( rs.next() ) {
                    resultList.add( rs.getString( 1 ) );
                }
            }
        } catch ( SQLException e ) {
            log.error( "error running SQL: " + querySQL, e );
            throw e;
        }

        return resultList;
    }
}
