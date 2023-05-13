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
public class Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher.class);

	private Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher() { }
	private static final Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher _INSTANCE = new Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher();
	public static Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher getInstance() { return _INSTANCE; }

	
	public static class Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher_Result_Item {
		
		private int id;
		private int proteinStartPosition;
		private int proteinEndPosition;
		private String protein_PreResidue;  //  protein residue before peptide or 'n' if peptide at start of protein.  null until computed
		private String protein_PostResidue; //  protein residue after peptide or 'c' if peptide at end of protein.  null until computed
		
		public int getId() {
			return id;
		}
		public int getProteinStartPosition() {
			return proteinStartPosition;
		}
		public int getProteinEndPosition() {
			return proteinEndPosition;
		}
		
		/**
		 * null until computed
		 * @return
		 */
		public String getProtein_PreResidue() {
			return protein_PreResidue;
		}
		/**
		 * null until computed
		 * @return
		 */
		public String getProtein_PostResidue() {
			return protein_PostResidue;
		}
		
	}
	

	private static final String SQL = "SELECT id, protein_start_position, protein_end_position, protein_pre_residue, protein_post_residue"
			+ " FROM protein_coverage_tbl WHERE search_id = ? AND protein_sequence_version_id = ?";
	
	
	/**
	 * @return
	 * @throws Exception
	 */
	public List<Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher_Result_Item> getProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId(
			
			int searchId,
			int proteinSequenceVersionId
			) throws Exception {
		
		List<Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher_Result_Item> resultList = new ArrayList<>();
		
		final String sql = SQL;

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			conn = Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			int counter = 0;
			
			counter++;
			pstmt.setInt(counter, searchId);
			counter++;
			pstmt.setInt(counter, proteinSequenceVersionId);
			
			rs = pstmt.executeQuery();

			while( rs.next() ) {
				Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher_Result_Item resultItem = new Limelight_DatabasePopulateNewFields__ProteinCoverage_Records_For_SearchId_ProteinSequenceVersionId_Searcher_Result_Item();
				resultItem.id = rs.getInt( "id" );
				resultItem.proteinStartPosition = rs.getInt( "protein_start_position" );
				resultItem.proteinEndPosition = rs.getInt( "protein_end_position" );
				resultItem.protein_PreResidue = rs.getString( "protein_pre_residue" );
				resultItem.protein_PostResidue = rs.getString( "protein_post_residue" );
				
				resultList.add( resultItem );
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
