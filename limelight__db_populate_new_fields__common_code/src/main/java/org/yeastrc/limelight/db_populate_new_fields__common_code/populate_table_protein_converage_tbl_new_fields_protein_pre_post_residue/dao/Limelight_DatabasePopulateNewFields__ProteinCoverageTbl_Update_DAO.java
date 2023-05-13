package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;

/**
 *  
 */
public class Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.class);

	private Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO() { }
	private static final Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO _INSTANCE = new Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO();
	public static Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO getInstance() { return _INSTANCE; }
	
	public static final int DEFAULT_BULK_UPDATE_SIZE = 10000;
	
	/**
	 * 
	 *
	 */
	public static class Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry {
		
		private int id;
		private String protein_PreResidue;
		private String protein_PostResidue;
		private boolean peptideAtProteinStart_Flag;  //  peptide at start of protein
		private boolean peptideAtProteinEnd_Flag;  //  peptide at end of protein
		
		public void setId(int id) {
			this.id = id;
		}
		public void setProtein_PreResidue(String protein_PreResidue) {
			this.protein_PreResidue = protein_PreResidue;
		}
		public void setProtein_PostResidue(String protein_PostResidue) {
			this.protein_PostResidue = protein_PostResidue;
		}
		public void setPeptideAtProteinStart_Flag(boolean peptideAtProteinStart_Flag) {
			this.peptideAtProteinStart_Flag = peptideAtProteinStart_Flag;
		}
		public void setPeptideAtProteinEnd_Flag(boolean peptideAtProteinEnd_Flag) {
			this.peptideAtProteinEnd_Flag = peptideAtProteinEnd_Flag;
		}
	}
	
	private static final String SQL_ONE_UPDATE =
			"UPDATE protein_coverage_tbl "
			+ " SET protein_pre_residue = ?, protein_post_residue = ?, "
			+ " peptide_at_protein_start_flag = ?, peptide_at_protein_end_flag = ? "
			+ " WHERE id = ? ";
	
	/**
	 * @return
	 * @throws Exception
	 */
	public void update_Protein_PrePost_Residue_For_Id(
			
			List<Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry> entryList
			) throws Exception {
		
		if ( entryList.isEmpty() ) {
			return; // EARLY RETURN
		}

		String sql = SQL_ONE_UPDATE;
		
		try ( Connection dbConnection = Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance().getConnection() ) {
			
			try {
				
				dbConnection.setAutoCommit(false);

				try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

					for ( Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry entry : entryList ) {

						int counter = 0;
						counter++;
						pstmt.setString( counter, entry.protein_PreResidue );
						counter++;
						pstmt.setString( counter, entry.protein_PostResidue );
						counter++;
						if ( entry.peptideAtProteinStart_Flag ) {
							pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
						} else {
							pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
						}
						counter++;
						if ( entry.peptideAtProteinEnd_Flag ) {
							pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
						} else {
							pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
						}
						counter++;
						pstmt.setInt( counter, entry.id );

						pstmt.addBatch();
					}

					pstmt.executeBatch();
				}
				
				dbConnection.commit();
				
			} catch (Throwable t) {
				
				int rollbackRetryCounter = 0;
				while ( true ) {
					
					rollbackRetryCounter++;
					
					try {
						dbConnection.rollback();
						
					} catch ( Throwable t2 ) {
						
						if ( rollbackRetryCounter > 6 ) {
							
							break;
						}
					}
				}
				
				throw t;
			}
			
		} catch ( Exception e ) {
			String msg = "update_Protein_PrePost_Residue_For_Id(...), sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		
	}
}
