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
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_webapp.dao.SearchScanFileDAO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table search_scan_file_tbl
 *
 */
@Component
public class SearchScanFile_For_Ids_Searcher extends Limelight_JDBC_Base implements SearchScanFile_For_Ids_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchScanFileDAO.class );
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_Ids_Searcher_IF#getSearchScanFile_For_Ids(java.util.Collection)
	 */
	@Override
	public List<SearchScanFileDTO> getSearchScanFile_For_Ids( Collection<Integer> ids ) throws SQLException {
		
		List<SearchScanFileDTO> resultList = new ArrayList<>();
		
		if ( ids.isEmpty() ) {
			return resultList;
		}
		
		StringBuilder querySQL_SB = new StringBuilder( 1000 );
		querySQL_SB.append( "SELECT * FROM search_scan_file_tbl WHERE id IN ( " );
		
		for ( int counter = 0; counter < ids.size(); counter++ ) {
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
			
			for ( Integer id : ids ) {
				counter++;
				preparedStatement.setInt( counter, id );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					SearchScanFileDTO result = new SearchScanFileDTO();
					result.setId( rs.getInt( "id" ) );
					result.setSearchId( rs.getInt( "search_id" ) );
					result.setFilename( rs.getString( "filename" ) );
					int scanFileId = rs.getInt( "scan_file_id" );
					if ( ! rs.wasNull() ) {
						result.setScanFileId( scanFileId );
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
