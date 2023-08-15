package org.yeastrc.limelight.database_cleanup.remove_feature_detection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;


/**
 * Clean up feature_detection_root_tbl table - Root
 *
 */
public class Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_Root {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_Root.class);

	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_Root() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_Root _instance = new Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_Root();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_Root getInstance() {
		return _instance; 
	}
	
	/**
	 * @param callFrom
	 * @param delete_Or_ListIdsToDelete
	 * @throws Exception
	 */
	public void cleanup_Root(
			
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom,
			Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum delete_Or_ListIdsToDelete
			
			) throws Exception {
		
		if ( delete_Or_ListIdsToDelete == Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.DELETE_RECORDS ) {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START: Overall: Deleting from table 'feature_detection_root_tbl'");
				System.out.println( "******" );
			}
		} else {
			
			if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
				System.out.println( "***************************************");
				System.out.println( "**  START:  Overall: Getting ids that would be deleted from table 'feature_detection_root_tbl'");
				System.out.println( "******" );
			}
		}

		Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_FailedToImport.getInstance().cleanup_FailedImports(callFrom, delete_Or_ListIdsToDelete);
		
		Limelight_DatabaseCleanup__Cleanup_FeatureDetectionRoot_NotMappedToProject.getInstance().cleanup_NoLongerMappedToProject(callFrom, delete_Or_ListIdsToDelete);

		if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.STANDALONE_PROGRAM ) {
			System.out.println( "***************************************");
			System.out.println( "**  END:  Overall: Deleting from table 'feature_detection_root_tbl'");
			System.out.println( "***************************************");
		}

	}
	
}
