package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.main;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.dao.Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.dao.Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.searchers.Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher;
import org.yeastrc.limelight.limelight_shared.protein_coverage_common.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util;
import org.yeastrc.limelight.limelight_shared.protein_coverage_common.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util.Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result;

/**
 * Pass in objects containing everything field needed from table protein_coverage_tbl
 * 
 * Just have to get the protein sequence
 * 
 * Called from Webapp for most efficient update of DB.
 *
 */
public class Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects {
	
	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects.class);
	
	/**
	 * private constructor
	 */
	private Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects _instance = new Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects getSingletonInstance() {
		return _instance; 
	}
	
	public static class Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem {
		
		private int protein_coverage_tbl__id; // protein_coverage_tbl.id
		private int proteinSequenceVersionId;
		private int proteinStartPosition;
		private int proteinEndPosition;
		
		/**
		 * protein_coverage_tbl.id
		 * @param protein_coverage_tbl__id
		 */
		public void setProtein_coverage_tbl__id(int protein_coverage_tbl__id) {
			this.protein_coverage_tbl__id = protein_coverage_tbl__id;
		}
		public void setProteinSequenceVersionId(int proteinSequenceVersionId) {
			this.proteinSequenceVersionId = proteinSequenceVersionId;
		}
		public void setProteinStartPosition(int proteinStartPosition) {
			this.proteinStartPosition = proteinStartPosition;
		}
		public void setProteinEndPosition(int proteinEndPosition) {
			this.proteinEndPosition = proteinEndPosition;
		}
	}
	

	/**
	 * @param requestItemList
	 * @throws Exception
	 */
	public void limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_MAIN(
			List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem> requestItemList 
			) throws Exception {

		//  Transfer to Map key proteinSequenceVersionId
		Map<Integer, List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem>> requestItemList_Map_Key_ProteinSequenceVersionId = new HashMap<>();

		for ( Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem item : requestItemList ) {
			
			List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem> requestItemList_InMap =
					requestItemList_Map_Key_ProteinSequenceVersionId.get( item.proteinSequenceVersionId );
			if ( requestItemList_InMap == null ) {
				requestItemList_InMap = new ArrayList<>();
				requestItemList_Map_Key_ProteinSequenceVersionId.put( item.proteinSequenceVersionId, requestItemList_InMap );
			}
			requestItemList_InMap.add(item);
		}
		
		List<Map.Entry<Integer, List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem>>> requestItemList_Map_Key_ProteinSequenceVersionId__EntryList =
				new ArrayList<>( requestItemList_Map_Key_ProteinSequenceVersionId.entrySet() );
		
		Collections.sort( requestItemList_Map_Key_ProteinSequenceVersionId__EntryList, new Comparator<Map.Entry<Integer, List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem>>>() {

			@Override
			public int compare(Map.Entry<Integer, List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem>> o1, Map.Entry<Integer, List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem>> o2) {

				return o1.getKey().compareTo( o2.getKey() );
			}
		});

		//  List to batch DB updates.  Set size to DEFAULT_BULK_UPDATE_SIZE
		List<Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry> updateEntryList = new ArrayList<>();
		
		for ( Map.Entry<Integer, List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem>> requestItemList_Map_Key_ProteinSequenceVersionId__MapEntry : requestItemList_Map_Key_ProteinSequenceVersionId__EntryList ) {
		
			Integer proteinSequenceVersionId = requestItemList_Map_Key_ProteinSequenceVersionId__MapEntry.getKey();
			List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem> requestItemList_For_ProteinSequenceVersionId = requestItemList_Map_Key_ProteinSequenceVersionId__MapEntry.getValue();
			

			String proteinSequence =
					Limelight_DatabasePopulateNewFields__ProteinSequence_For_ProteinSequenceVersionId_Searcher.getInstance()
					.getProteinSequence_For_ProteinSequenceVersionId(proteinSequenceVersionId);
			
			if ( proteinSequence == null ) {
				String msg = "SKIPPING Since Protein sequence NOT found for proteinSequenceVersionId: " + proteinSequenceVersionId;
				log.error( msg );
				continue; // EARLY CONTINUE
			}

			for ( Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem requestItem : requestItemList_For_ProteinSequenceVersionId ) {

				Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util__Result result__Peptide_Pre_Post_Residues =
						Compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util
						.compute_Peptide_Pre_Post_Residues_For_ProteinSequence_Peptide_StartEnd_Positions_Util(
								proteinSequence, 
								requestItem.proteinStartPosition, // peptideStartPosition_InProtein 
								requestItem.proteinEndPosition // peptideEndPosition_InProtein
								);

				Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry updateEntry = new Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO_UpdateEntry();
				
				updateEntry.setId( requestItem.protein_coverage_tbl__id );
				
				updateEntry.setProtein_PreResidue( result__Peptide_Pre_Post_Residues.getProtein_PreResidue() );
				updateEntry.setProtein_PostResidue( result__Peptide_Pre_Post_Residues.getProtein_PostResidue() );
				updateEntry.setPeptideAtProteinStart_Flag( result__Peptide_Pre_Post_Residues.isPeptideAtProteinStart_Flag() );
				updateEntry.setPeptideAtProteinEnd_Flag( result__Peptide_Pre_Post_Residues.isPeptideAtProteinEnd_Flag() );

				updateEntryList.add(updateEntry);
				
				if ( updateEntryList.size() >= Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.DEFAULT_BULK_UPDATE_SIZE ) {

					//  Update DB for batch
					Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.getInstance()
					.update_Protein_PrePost_Residue_For_Id( updateEntryList );
					
					updateEntryList.clear(); // Reset for next batch
				}	
			}
		}
		

		if ( ! updateEntryList.isEmpty() ) {
			//  Update DB for last batch
			Limelight_DatabasePopulateNewFields__ProteinCoverageTbl_Update_DAO.getInstance()
			.update_Protein_PrePost_Residue_For_Id( updateEntryList );
		}
	}
}
