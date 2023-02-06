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
public class SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher extends Limelight_JDBC_Base implements SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher_IF {

    private static final Logger log = LoggerFactory.getLogger( SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher.class );
    
    public static class SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher_Result {
    	
    	private String spectralStorageAPIKey;

		public String getSpectralStorageAPIKey() {
			return spectralStorageAPIKey;
		}
    }


    private static final String QUERY_SQL =
            "SELECT scan_file_tbl.spectral_storage_api_key "
            + " FROM project_scan_file_tbl "
            + " INNER JOIN scan_file_tbl ON scan_file_tbl.id = project_scan_file_tbl.scan_file_id "
            
            + " WHERE project_scan_file_tbl.project_id = ? AND project_scan_file_tbl.scan_file_id = ?";

	@Override
	public SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher_Result get_SpectralStorageAPIKey_For_ProjectId_ScanFileId__Using__project_scan_file_tbl(int projectId, int scanFileId) throws SQLException {

    	SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher_Result result = null;
    	
        final String querySQL = QUERY_SQL;

		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
            preparedStatement.setInt( 1, projectId );
            preparedStatement.setInt( 2, scanFileId );

            try ( ResultSet rs = preparedStatement.executeQuery() ) {
                if ( rs.next() ) {
                	result = new SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__project_scan_file_tbl_Searcher_Result();
                    result.spectralStorageAPIKey = rs.getString( "spectral_storage_api_key" );
                }
            }
        } catch ( SQLException e ) {
            log.error( "error running SQL: " + querySQL, e );
            throw e;
        }

        return result;
    }
}
