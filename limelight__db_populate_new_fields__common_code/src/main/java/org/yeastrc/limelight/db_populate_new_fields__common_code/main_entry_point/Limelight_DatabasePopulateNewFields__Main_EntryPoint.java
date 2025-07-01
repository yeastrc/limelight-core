package org.yeastrc.limelight.db_populate_new_fields__common_code.main_entry_point;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.constants_and_enums.Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.db_populate_new_fields__common_code.database_version_info_retrieval_compare.Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.db_populate_new_fields__common_code.database_version_info_retrieval_compare.Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.main.Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.main.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN;

/**
 * 
 *
 */
public class Limelight_DatabasePopulateNewFields__Main_EntryPoint {
	
	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__Main_EntryPoint.class);
	
	/**
	 * private constructor
	 */
	private Limelight_DatabasePopulateNewFields__Main_EntryPoint() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabasePopulateNewFields__Main_EntryPoint _instance = new Limelight_DatabasePopulateNewFields__Main_EntryPoint();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabasePopulateNewFields__Main_EntryPoint getSingletonInstance() {
		return _instance; 
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	public void limelight_DatabasePopulateNewFields__Main_EntryPoint(
			Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom ) throws Exception {
		
		if ( callFrom == null ) {
			throw new IllegalArgumentException( "( callFrom == null )" );
		}
		
		//  Check that DB Version Number matches code
		
		{
			LimelightDatabaseSchemaVersion_Comparison_Result current_SchemaVersion_Comparison_Result = 
					Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance()
					.getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result();
			
			if ( current_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {
				
				if ( callFrom == Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
					log.error("Current Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.  Will test again after standard wait time which is likely 24 hours.");
				} else {
					String msg = "Current Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.";
					System.out.println( msg );
					System.err.println( msg );
				}
				
				return; // EARLY RETURN
			}

			LimelightDatabaseSchemaVersion_Comparison_Result updateInProgress_SchemaVersion_Comparison_Result = 
					Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance()
					.getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result();

			if ( updateInProgress_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {
				
				if ( callFrom == Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
					log.error("Update In Progress Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.  Will test again after standard wait time which is likely 24 hours.");
				} else {
					String msg = "Update In Progress Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Cleanup.";
					System.out.println( msg );
					System.err.println( msg );
				}
				
				return; // EARLY RETURN
			}

		}
		
		//  Main Processing

		log.warn( "INFO:: STARTING: Database Populate New Fields.  When completed it will wait before it runs again" );
		
		Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN.getSingletonInstance()
		.limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN(callFrom);

		Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN.getSingletonInstance()
		.limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_MAIN(callFrom);
		
	}
}
