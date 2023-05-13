package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode;

/**
 *  
 */
public class Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher.class);

	private Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher() { }
	private static final Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher _INSTANCE = new Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher();
	public static Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher getInstance() { return _INSTANCE; }
	
	private static final String SQL = 
			"SELECT protein_sequence_tbl.sequence "
			+ " FROM protein_sequence_tbl"
			+ " INNER JOIN protein_sequence_version_tbl ON protein_sequence_tbl.id = protein_sequence_version_tbl.protein_sequence_id "
			+ " WHERE protein_sequence_version_tbl.id = ?";
	
	/**
	 * @return
	 * @throws Exception
	 */
	public String getProteinSequence_For_ProteinSequenceVersionId(
			
			int proteinSequenceVersionId
			) throws Exception {
		
		String result = null;

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		String sql = SQL;
				
		try {
			conn = Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			pstmt.setInt( 1, proteinSequenceVersionId );
			
			rs = pstmt.executeQuery();

			if( rs.next() ) {
				result = rs.getString( "sequence" );
			}

		} catch ( Exception e ) {
			String msg = "getProteinSequence_For_ProteinSequenceVersionId(...), sql: " + sql;
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
		return result;
	}
}
