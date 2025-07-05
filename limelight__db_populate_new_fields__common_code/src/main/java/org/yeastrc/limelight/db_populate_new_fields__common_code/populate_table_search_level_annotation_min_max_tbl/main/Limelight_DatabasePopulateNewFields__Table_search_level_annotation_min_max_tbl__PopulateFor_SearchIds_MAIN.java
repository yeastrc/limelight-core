package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.main;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.exceptions.Limelight_DatabasePopulateNewFields__DatabaseContents_Unexpected_Exception;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants;
import org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code.Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__SharedCode__DAO;

/**
 * Called from Webapp to populate table search_level_annotation_min_max_tbl if not populated for supplied search ids
 *
 */
public class Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__PopulateFor_SearchIds_MAIN {

	private static final Logger log = LoggerFactory.getLogger( Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__PopulateFor_SearchIds_MAIN.class );
	
	/**
	 * private constructor
	 */
	private Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__PopulateFor_SearchIds_MAIN() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__PopulateFor_SearchIds_MAIN _instance = new Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__PopulateFor_SearchIds_MAIN();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__PopulateFor_SearchIds_MAIN getSingletonInstance() {
		return _instance; 
	}

	/**
	 * @throws Exception 
	 * 
	 */
	public void limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__PopulateFor_SearchIds_MAIN(
			Set<Integer> searchIds
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
		
		Map<Integer, Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO> updatesForSearch_Map_Key_SearchId = new HashMap<>( searchIds.size() );
		
		{
			List<Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO> updatesForSearchList = 
					Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch__SharedCode__DAO.getInstance()
					.getItemList_For_RootId_SearchIds( aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet.getId(), searchIds );

			for ( Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO item : updatesForSearchList ) {
				updatesForSearch_Map_Key_SearchId.put( item.getSearchId(), item );
			}
		}
		
		for ( Integer searchId : searchIds ) {
			
			if ( ! updatesForSearch_Map_Key_SearchId.containsKey( searchId ) ) {
				
				Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl_MAIN.getSingletonInstance()
				.limelight_DatabasePopulateNewFields_SingleSearch(  
						searchId, aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO_FromDBGet );
			}
			
		}
	}
}
