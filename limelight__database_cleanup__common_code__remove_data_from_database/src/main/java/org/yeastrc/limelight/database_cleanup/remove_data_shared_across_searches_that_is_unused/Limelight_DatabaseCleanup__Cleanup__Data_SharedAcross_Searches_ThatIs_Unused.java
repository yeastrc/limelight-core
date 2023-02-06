package org.yeastrc.limelight.database_cleanup.remove_data_shared_across_searches_that_is_unused;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;


/**
 * Clean up data is that is shared across searches that is unused, like peptide_tbl table
 *
 */
public class Limelight_DatabaseCleanup__Cleanup__Data_SharedAcross_Searches_ThatIs_Unused {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Cleanup__Data_SharedAcross_Searches_ThatIs_Unused.class);

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Cleanup__Data_SharedAcross_Searches_ThatIs_Unused() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Cleanup__Data_SharedAcross_Searches_ThatIs_Unused _instance = new Limelight_DatabaseCleanup__Cleanup__Data_SharedAcross_Searches_ThatIs_Unused();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Cleanup__Data_SharedAcross_Searches_ThatIs_Unused getInstance() {
		return _instance; 
	}
	
	/**
	 * @param callFrom
	 * @param delete_Or_ListIdsToDelete
	 * @throws Exception
	 */
	public void cleanup_Shared_Unused(
			
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom,
			Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum delete_Or_ListIdsToDelete
			
			) throws Exception {
		
		Limelight_DatabaseCleanup_ProteinSequenceAnnotationTbl_Cleanup.getInstance().cleanup_ProteinSequenceAnnotationTbl_Unused(callFrom, delete_Or_ListIdsToDelete);
		
		Limelight_DatabaseCleanup_ProteinSequenceVersionTbl_Cleanup.getInstance().cleanup_ProteinSequenceVersionTbl_Unused(callFrom, delete_Or_ListIdsToDelete);
		
		Limelight_DatabaseCleanup_ProteinSequenceTbl_Cleanup.getInstance().cleanup_ProteinSequenceTbl_Unused(callFrom, delete_Or_ListIdsToDelete);

		Limelight_DatabaseCleanup_PeptideTbl_Cleanup.getInstance().cleanup_PeptideTbl_Unused(callFrom, delete_Or_ListIdsToDelete);

		Limelight_DatabaseCleanup_ReportedPeptideTbl_Cleanup.getInstance().cleanup_ReportedPeptideTbl_Unused(callFrom, delete_Or_ListIdsToDelete);
	}
	
}
