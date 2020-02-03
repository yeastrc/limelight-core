package org.yeastrc.limelight.limelight_webapp.searchers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Component
public class ReportedPeptideHasMods_Searcher extends Limelight_JDBC_Base implements ReportedPeptideHasMods_SearcherIF {
    
	private static final Logger log = LoggerFactory.getLogger( ReportedPeptideHasMods_Searcher.class );

    private static final String QUERY_SQL = "SELECT reported_peptide_id, has_dynamic_modifictions FROM search__rep_pept__lookup_tbl " +
            "WHERE reported_peptide_id IN ";

    @Override
    public Map<Integer, Boolean> getReportedPeptideHasMods(Collection<Integer> reportedPeptideIds) throws Exception {

        Map<Integer, Boolean> resultMap = new HashMap<>();
        
        if ( reportedPeptideIds.isEmpty() ) {
        	//  No reportedPeptideIds to search for so return empty Map
        	return resultMap; // EARLY RETURN
        }

        final String querySQL = getQuerySQL( reportedPeptideIds );
        
        try (Connection connection = super.getDBConnection();
             PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

            int counter = 1;
            for( int reportedPeptideId : reportedPeptideIds ) {
                preparedStatement.setInt( counter, reportedPeptideId );
                counter++;
            }

            try ( ResultSet rs = preparedStatement.executeQuery() ) {
                while ( rs.next() ) {
                    resultMap.put(rs.getInt(1), rs.getInt( 2 ) == 0 ? false : true );
                }
            }
        } catch ( SQLException e ) {
            log.error( "error running SQL: " + querySQL, e );
            throw e;
        }

        if ( resultMap.keySet().size() != reportedPeptideIds.size() ) {
            String msg = "did not get dynamic mod status for right number peptides.  resultMap.keySet().size() : " 
            		+ resultMap.keySet().size() 
            		+ ", reportedPeptideIds.size(): "
            		+ reportedPeptideIds.size();
            log.error(msg);
            throw new Exception(msg);
        }

        return resultMap;
    }

    private String getQuerySQL(Collection<Integer> reportedPeptideIds) {

        StringBuilder sb = new StringBuilder();
        sb.append( QUERY_SQL );
        sb.append( "(" );
        for( int i = 0; i < reportedPeptideIds.size(); i++ ) {
            if( i != 0 ) {
                sb.append(",");
            }
            sb.append("?");
        }
        sb.append( ")" );

        return sb.toString();

    }
}
