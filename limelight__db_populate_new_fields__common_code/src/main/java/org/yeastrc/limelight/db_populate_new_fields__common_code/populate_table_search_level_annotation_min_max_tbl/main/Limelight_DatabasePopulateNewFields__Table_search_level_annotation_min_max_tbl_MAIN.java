package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.main;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.constants_and_enums.Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum;
import org.yeastrc.limelight.db_populate_new_fields__common_code.database_version_info_retrieval_compare.Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
import org.yeastrc.limelight.db_populate_new_fields__common_code.database_version_info_retrieval_compare.Limelight_DatabasePopulateNewFields__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.db_populate_new_fields__common_code.exceptions.Limelight_DatabasePopulateNewFields__DatabaseContents_Unexpected_Exception;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.dao.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__SaveDBRecords_DAO;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.searchers.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.searchers.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.searchers.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_modification_position_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.searchers.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_peptide_position_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.searchers.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_srch__protein_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.searchers.Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_srch__rep_pept_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher;
import org.yeastrc.limelight.limelight_shared.dto.SearchLevel_Annotation_MinMax_DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;


/**
 * 
 * 
 *
 */
public class Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN {

	private static final Logger log = LoggerFactory.getLogger( Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN.class );
	

	/**
	 * private constructor
	 */
	private Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN _instance = new Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN getSingletonInstance() {
		return _instance; 
	}

	/**
	 * @throws Exception 
	 * 
	 */
	public void limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN(
			Limelight_DatabasePopulateNewFields__CallFrom__RunImporter_VS_StandaloneProgram_Enum callFrom
			) throws Exception {
		
		//  First Get or Save and Get the Root record for this label_ShortKey
		
		final String label_ShortKey = Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants.LABEL_SHORT_KEY_VALUE___SEARCH_LEVEL_ANNOTATION_MIN_MAX_TBL;
		
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet =
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
				.getItem_ForLabelShortKey( label_ShortKey );
		
		if ( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet == null ) {
			
			//  No record currently exists so insert record.  Insert will NOT return inserted id.
			{
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave = new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO();
				aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave.setLabel_ShortKey(label_ShortKey);
				aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO__ToSave.setLabel( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants.LABEL_VALUE___SEARCH_LEVEL_ANNOTATION_MIN_MAX_TBL );
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
		
		Integer smallest_SearchId_ForRootId =
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance()
				.get_SmallestSearchId_ForRootId( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId() );

		Integer next_SearchId_ToProcess = null;
		
		if ( smallest_SearchId_ForRootId != null ) {
			//  Continue at next smaller search id
			
			next_SearchId_ToProcess =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.getInstance()
					.getLargestSearchId_LessThanSearchIdPassedIn(smallest_SearchId_ForRootId);
		} else {

			next_SearchId_ToProcess =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.getInstance()
					.getLargestSearchId();
		}

		while ( true ) {
			//  Loop to skip already processed Search Id
		
			if ( next_SearchId_ToProcess == null ) {
				// no next search id so exit loop
				break; //  EARLY BREAK LOOP
			}
			
			Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO entryForSearchId =
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance()
				.getItem_ForRootIdSearchId( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId(), next_SearchId_ToProcess.intValue() );
			
			if ( entryForSearchId == null ) {
				//  No record in 'Already Processed' for this Search Id in 'next_SearchId_ToProcess'
				
				//  Process this Search Id in 'next_SearchId_ToProcess' since NOT already processed
				break; //  EARLY BREAK LOOP
			}
			
			int next_Smaller_SearchId = next_SearchId_ToProcess.intValue() - 1; // Skip to next since already processed this search id

			//  Get next smaller next_SearchId_ToProcess
			next_SearchId_ToProcess =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.getInstance()
					.getLargestSearchId_LessThanSearchIdPassedIn(next_Smaller_SearchId);
		}
		
		while ( next_SearchId_ToProcess != null ) {

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
						log.error( msg );
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
						log.error( msg );
					}
					
					return; // EARLY RETURN
				}

			}

			log.warn( "INFO:: STARTING: Database Populate New Fields for table 'search_level_annotation_min_max_tbl'.  When completed it will wait before it runs again" );
			

			// Process Search Id
			
			limelight_DatabasePopulateNewFields_SingleSearch( 
					next_SearchId_ToProcess, aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet );

			//  Get Next Search Id
			
			while ( true ) { //  Loop to find next Search Id that is not already processed

				//  Get Next Search Id
				next_SearchId_ToProcess =
						Aa_LimelightDb_UpdatesIn_RunImporterOrPgm__Largest_SearchId_LessThanPassedInSearchId__SharedCode__Searcher.getInstance()
						.getLargestSearchId_LessThanSearchIdPassedIn(next_SearchId_ToProcess);
				
				if ( next_SearchId_ToProcess == null ) {
					// no next search id so exit loop
					break; //  EARLY BREAK LOOP
				}
				
				Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO entryForSearchId =
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance()
					.getItem_ForRootIdSearchId( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId(), next_SearchId_ToProcess.intValue() );
				
				if ( entryForSearchId == null ) {
					 // exit since NOT processed this search id
					break; //  EARLY BREAK LOOP
				}
				
				//  Got here so will get next smaller search id in next iteration of loop
			}
		}
		
		//  NO more searches to process or no searches in db.
		
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO.getInstance()
		.update_To_Set_UpdatesComplete( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId() );
		

		log.warn( "INFO:: FINISHED: Database Populate New Fields for table 'search_level_annotation_min_max_tbl'.  When completed it will wait before it runs again" );
		
	}
	
	/**
	 * Package Private
	 * 
	 * @throws Exception 
	 * 
	 */
	void limelight_DatabasePopulateNewFields_SingleSearch(
			int searchId,
			Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO			) throws Exception {
		
		
		List<Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher.Filterable_AnnotationTypeEntries_For_SearchId_Searcher_Result> annotationTypeList =
				Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher.getInstance()
				.getAnnotationTypeListForSearchId(searchId);

		
		for ( Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher.Filterable_AnnotationTypeEntries_For_SearchId_Searcher_Result
				annotationType : annotationTypeList ) {
			

			if ( annotationType.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM ) {

				Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher.Searcher_Result
				minMaxValueIn_result = (
						Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher
						.getInstance()
						.get_MaxMin_For_SearchId_AnnotationTypeId( searchId, annotationType.getAnnotationTypeId() )
						);
				
				save_MinMax_ToDB( searchId, annotationType, minMaxValueIn_result.getMin_Value(), minMaxValueIn_result.getMax_Value() );

			} else if ( annotationType.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM_PEPTIDE_POSITION ) {

				Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_peptide_position_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher.Searcher_Result 
				minMaxValueIn_result = (
						Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_peptide_position_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher
						.getInstance()
						.get_MaxMin_For_SearchId_AnnotationTypeId(searchId, annotationType.getAnnotationTypeId() )
						);
				
				save_MinMax_ToDB( searchId, annotationType, minMaxValueIn_result.getMin_Value(), minMaxValueIn_result.getMax_Value() );

			} else if ( annotationType.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MODIFICATION_POSITION ) {
				
				Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_modification_position_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher.Searcher_Result
				minMaxValueIn_result = (
						Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_modification_position_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher.getInstance()
						.get_MaxMin_For_SearchId_AnnotationTypeId( searchId, annotationType.getAnnotationTypeId() )
						);
				
				save_MinMax_ToDB( searchId, annotationType, minMaxValueIn_result.getMin_Value(), minMaxValueIn_result.getMax_Value() );
				
			} else if ( annotationType.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PEPTIDE ) {

				Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_srch__rep_pept_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher.Searcher_Result 
				minMaxValueIn_result = (
						Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_srch__rep_pept_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher
						.getInstance()
						.get_MaxMin_For_SearchId_AnnotationTypeId(searchId, annotationType.getAnnotationTypeId() )
						);
				
				save_MinMax_ToDB( searchId, annotationType, minMaxValueIn_result.getMin_Value(), minMaxValueIn_result.getMax_Value() );

			} else if ( annotationType.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN ) {

				Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_srch__protein_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher.Searcher_Result 
				minMaxValueIn_result = (
						Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_srch__protein_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher
						.getInstance()
						.get_MaxMin_For_SearchId_AnnotationTypeId(searchId, annotationType.getAnnotationTypeId() )
						);
				
				save_MinMax_ToDB( searchId, annotationType, minMaxValueIn_result.getMin_Value(), minMaxValueIn_result.getMax_Value() );
			}
			
		}

		//  Mark Search Complete
		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO completeForSearch_DTO = new Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO();
		completeForSearch_DTO.setRootTableId(aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO.getId());
		completeForSearch_DTO.setSearchId(searchId);

		Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance().save( completeForSearch_DTO );
	}
	
	/**
	 * 
	 * @param searchId
	 * @param annotationTypeDTO
	 * @param minValue
	 * @param maxValue
	 * @throws Exception 
	 */
	private void save_MinMax_ToDB( 
			
			int searchId, 
			Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher.Filterable_AnnotationTypeEntries_For_SearchId_Searcher_Result annotationType, 
			double minValue, double maxValue ) throws Exception {
		
		double bestValue = maxValue;
		double worstValue = minValue;
		
		if ( annotationType.getFilterDirectionType() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
			
			bestValue = maxValue;
			worstValue = minValue;
		}
		
		SearchLevel_Annotation_MinMax_DTO searchLevel_Annotation_MinMax_DTO = new SearchLevel_Annotation_MinMax_DTO();
		
		searchLevel_Annotation_MinMax_DTO.setSearchId( searchId );
		searchLevel_Annotation_MinMax_DTO.setAnnotationTypeId( annotationType.getAnnotationTypeId() );
		searchLevel_Annotation_MinMax_DTO.setMax_ValueDouble( maxValue );
		searchLevel_Annotation_MinMax_DTO.setMin_ValueDouble( minValue );
		searchLevel_Annotation_MinMax_DTO.setBest_ValueDouble( bestValue );
		searchLevel_Annotation_MinMax_DTO.setWorst_ValueDouble( worstValue );
		
		Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__SaveDBRecords_DAO.getInstance().table_search_level_annotation_min_max_tbl__SaveDBRecord(searchLevel_Annotation_MinMax_DTO);
		
	}

}
