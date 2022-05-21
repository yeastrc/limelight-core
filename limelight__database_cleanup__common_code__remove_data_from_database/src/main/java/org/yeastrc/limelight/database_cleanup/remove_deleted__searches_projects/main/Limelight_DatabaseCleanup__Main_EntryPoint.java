package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.database_cleanup.constants_and_enums.Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum;
import org.yeastrc.limelight.database_cleanup.database_version_info_retrieval_compare.Limelight_DatabaseCleanup__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.database_cleanup.database_version_info_retrieval_compare.Limelight_DatabaseCleanup__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;

/**
 * 
 *
 */
public class Limelight_DatabaseCleanup__Main_EntryPoint {
	
	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__Main_EntryPoint.class);
	
	/**
	 * private constructor
	 */
	private Limelight_DatabaseCleanup__Main_EntryPoint() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabaseCleanup__Main_EntryPoint _instance = new Limelight_DatabaseCleanup__Main_EntryPoint();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabaseCleanup__Main_EntryPoint getSingletonInstance() {
		return _instance; 
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	public void limelight_DatabaseCleanup__Main_EntryPoint(
			Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom,
			Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum delete_Or_ListIdsToDelete ) throws Exception {
		
		if ( callFrom == null || delete_Or_ListIdsToDelete == null ) {
			throw new IllegalArgumentException( "( callFrom == null || delete_Or_ListIdsToDelete == null )" );
		}
		
		//  Check that DB Version Number matches code
		
		{
			LimelightDatabaseSchemaVersion_Comparison_Result current_SchemaVersion_Comparison_Result = 
					Limelight_DatabaseCleanup__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance()
					.getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result();
			
			if ( current_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {
				
				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
					log.error("Current Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.  Will test again after standard wait time which is likely 24 hours.");
				} else {
					String msg = "Current Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.";
					System.out.println( msg );
					System.err.println( msg );
				}
				
				return; // EARLY RETURN
			}

			LimelightDatabaseSchemaVersion_Comparison_Result updateInProgress_SchemaVersion_Comparison_Result = 
					Limelight_DatabaseCleanup__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance()
					.getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result();

			if ( updateInProgress_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {
				
				if ( callFrom == Limelight_DatabaseCleanup__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
					log.error("Update In Progress Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.  Will test again after standard wait time which is likely 24 hours.");
				} else {
					String msg = "Update In Progress Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.";
					System.out.println( msg );
					System.err.println( msg );
				}
				
				return; // EARLY RETURN
			}

		}
		

		{
//			String msg = "Variable Assignment::  delete_Or_ListIdsToDelete  =  Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.LIST_RECORD_IDS_TO_DELETE";
//			System.out.println( msg );
//			System.err.println( msg );
//			
//			delete_Or_ListIdsToDelete = Limelight_DatabaseCleanup__Delete_OR_ListIdsToDelete_Enum.LIST_RECORD_IDS_TO_DELETE;
		}
		
		
		//  Main Processing
		
		Limelight_DatabaseCleanup__Cleanup_ProjectSearchTbl_And_Children.getInstance().cleanup_ProjectSearch_AndChildren( callFrom, delete_Or_ListIdsToDelete );
		
		
		Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children.getInstance().cleanup_Search_AndChildren( callFrom, delete_Or_ListIdsToDelete );

		{
//			String msg = "Program EXIT after call Limelight_DatabaseCleanup__Cleanup_SearchTbl_And_Children.getInstance().cleanup_Search_AndChildren(...)";
//			System.out.println( msg );
//			System.err.println( msg );
		}
		
//		return;
		Limelight_DatabaseCleanup__Cleanup_ProjectTbl.getInstance().cleanup_Project( callFrom, delete_Or_ListIdsToDelete );
	}
}
