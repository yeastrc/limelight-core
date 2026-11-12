package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl__fix_below_best_worst.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.constants_and_enums.Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.db_populate_new_fields__common_code.database_version_info_retrieval_compare.Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.db_populate_new_fields__common_code.database_version_info_retrieval_compare.Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.db_populate_new_fields__common_code.exceptions.Limelight_DatabasePopulateNewFields__DatabaseContents_Unexpected_Exception;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl__fix_below_best_worst.dao.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_Update_DAO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO;


/**
 * Fix best/worst values in table 'search_level_annotation_min_max_tbl' for annotation types with filter direction 'below'.
 *
 * The Populate of table 'search_level_annotation_min_max_tbl' wrote best = max and worst = min for filter direction 'below'.
 *
 * Run ONLY after the Populate of table 'search_level_annotation_min_max_tbl' is complete.
 * Runs once, then marks its own Root record complete.
 *
 */
public class Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_MAIN {

	private static final Logger log = LoggerFactory.getLogger( Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_MAIN.class );


	/**
	 * private constructor
	 */
	private Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_MAIN() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_MAIN _instance = new Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_MAIN();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_MAIN getSingletonInstance() {
		return _instance;
	}

	/**
	 * @throws Exception
	 *
	 */
	public void limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_MAIN(
			Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom
			) throws Exception {

		//  First Get or Save and Get the Root record for this label_ShortKey

		final String label_ShortKey = Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants.LABEL_SHORT_KEY_VALUE___SEARCH_LEVEL_ANNOTATION_MIN_MAX_TBL__FIX_BELOW_BEST_WORST;

		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet =
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
				.getItem_ForLabelShortKey( label_ShortKey );

		if ( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet == null ) {

			//  No record currently exists so insert record.  Insert will NOT return inserted id.
			{
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave = new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO();
				aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave.setLabel_ShortKey(label_ShortKey);
				aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave.setLabel( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants.LABEL_VALUE___SEARCH_LEVEL_ANNOTATION_MIN_MAX_TBL__FIX_BELOW_BEST_WORST );
				aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave.setUpdatesComplete(false);

				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
				.save(aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave);
			}

			//  Save not return id so get record again to get id

			aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
					.getItem_ForLabelShortKey( label_ShortKey );

			if ( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet == null ) {
				String msg = "No Record from Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance().getItem_ForLabelShortKey( label_ShortKey ) after do save to table.";
				log.error(msg);
				throw new Limelight_DatabasePopulateNewFields__DatabaseContents_Unexpected_Exception(msg);
			}
		}

		if ( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.isUpdatesComplete() ) {

			//  Database Already Fully updated for this update so exit

			return;  // EARLY RETURN
		}

		//  Only run when the Populate of table 'search_level_annotation_min_max_tbl' is complete

		{
			Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO minMaxTbl_Populate_Root_DTO =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
					.getItem_ForLabelShortKey( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants.LABEL_SHORT_KEY_VALUE___SEARCH_LEVEL_ANNOTATION_MIN_MAX_TBL );

			if ( minMaxTbl_Populate_Root_DTO == null || ( ! minMaxTbl_Populate_Root_DTO.isUpdatesComplete() ) ) {

				log.warn( "INFO:: SKIPPING: Database Populate New Fields Fix for table 'search_level_annotation_min_max_tbl' best/worst for filter direction 'below' since the Populate for table 'search_level_annotation_min_max_tbl' is NOT complete.  Will test again when it runs again" );

				return;  // EARLY RETURN
			}
		}

		//  Check that DB Version Number matches code

		{
			LimelightDatabaseSchemaVersion_Comparison_Result current_SchemaVersion_Comparison_Result =
					Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance()
					.getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result();

			if ( current_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

				if ( callFrom == Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
					log.error("Current Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Populate New Fields Fix.  Will test again after standard wait time which is likely 24 hours.");
				} else {
					String msg = "Current Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Populate New Fields Fix.";
					log.error( msg );
				}

				return; // EARLY RETURN
			}

			LimelightDatabaseSchemaVersion_Comparison_Result updateInProgress_SchemaVersion_Comparison_Result =
					Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getInstance()
					.getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result();

			if ( updateInProgress_SchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

				if ( callFrom == Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum.LIMELIGHT__RUN_IMPORTER_PROGRAM ) {
					log.error("Update In Progress Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Populate New Fields Fix.  Will test again after standard wait time which is likely 24 hours.");
				} else {
					String msg = "Update In Progress Database Schema Version Number in Database table does NOT match the Database Schema Version Number in the code so NOT performing Database Populate New Fields Fix.";
					log.error( msg );
				}

				return; // EARLY RETURN
			}
		}

		log.warn( "INFO:: STARTING: Database Populate New Fields Fix for table 'search_level_annotation_min_max_tbl' best/worst for filter direction 'below'." );

		int rowsUpdated =
				Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_Update_DAO.getInstance()
				.update_Fix_Below_BestWorst();

		log.warn( "INFO:: Database Populate New Fields Fix for table 'search_level_annotation_min_max_tbl' best/worst for filter direction 'below'.  Number of rows updated: " + rowsUpdated );

		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
		.update_To_Set_UpdatesComplete( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId() );

		log.warn( "INFO:: FINISHED: Database Populate New Fields Fix for table 'search_level_annotation_min_max_tbl' best/worst for filter direction 'below'." );
	}

}
