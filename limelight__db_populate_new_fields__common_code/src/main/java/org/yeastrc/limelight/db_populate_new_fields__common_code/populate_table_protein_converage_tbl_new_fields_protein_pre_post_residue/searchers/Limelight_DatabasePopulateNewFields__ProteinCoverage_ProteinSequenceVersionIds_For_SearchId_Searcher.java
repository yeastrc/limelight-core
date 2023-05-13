package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode;

/**
 *  
 */
public class Limelight_DatabasePopulateNewFields__ProteinCoverage_ProteinSequenceVersionIds_For_SearchId_Searcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__ProteinCoverage_ProteinSequenceVersionIds_For_SearchId_Searcher.class);

	private Limelight_DatabasePopulateNewFields__ProteinCoverage_ProteinSequenceVersionIds_For_SearchId_Searcher() { }
	private static final Limelight_DatabasePopulateNewFields__ProteinCoverage_ProteinSequenceVersionIds_For_SearchId_Searcher _INSTANCE = new Limelight_DatabasePopulateNewFields__ProteinCoverage_ProteinSequenceVersionIds_For_SearchId_Searcher();
	public static Limelight_DatabasePopulateNewFields__ProteinCoverage_ProteinSequenceVersionIds_For_SearchId_Searcher getInstance() { return _INSTANCE; }

	/**
	 * @return
	 * @throws Exception
	 */
	public List<Integer> getProteinSequenceVersionIds_For_SearchId(
			
			int searchId
			) throws Exception {
		
		List<Integer> resultList = new ArrayList<>();

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		String sql = "SELECT DISTINCT protein_sequence_version_id FROM protein_coverage_tbl WHERE search_id = ?";
				
		try {
			conn = Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			pstmt.setInt(1, searchId);
			
			rs = pstmt.executeQuery();

			while( rs.next() ) {
				resultList.add( rs.getInt( "protein_sequence_version_id" ) );
			}

		} catch ( Exception e ) {
			String msg = "getProteinSequenceVersionIds_For_SearchId_OptionalReportedPeptideIds(...), sql: " + sql;
			log.error( msg, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
				if( pstmt != null ) {
					try { pstmt.close(); } catch( Throwable t ) { ; }
					pstmt = null;
				}
				if( conn != null ) {
					try { conn.close(); } catch( Throwable t ) { ; }
					conn = null;
				}
			}
		}
		return resultList;
	}
}
