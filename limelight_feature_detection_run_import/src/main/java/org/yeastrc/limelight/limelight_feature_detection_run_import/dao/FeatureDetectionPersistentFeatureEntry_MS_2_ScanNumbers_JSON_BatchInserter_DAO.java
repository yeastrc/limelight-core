package org.yeastrc.limelight.limelight_feature_detection_run_import.dao;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO;

/**
 * Insert Batches into table feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl
 * 
 * FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_InsertONLY_DAO 
 *
 */
public class FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_BatchInserter_DAO {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_BatchInserter_DAO() { }
	public static FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_BatchInserter_DAO singletonInstance = new FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_BatchInserter_DAO();
	
	private List<FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO> item_List = new ArrayList<>( INSERT_BATCH_SIZE );
	

	/**
	 * @param featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO
			
			) throws Exception {

		{
			//  Add to Batch
			
			item_List.add(featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO);
		}
		
		_saveBatch_IfNeeded();
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void _saveBatch_IfNeeded() throws Exception {

		if ( item_List.size() >= INSERT_BATCH_SIZE ) {
			
			//  At Batch Size so save
						
			{  //  Save objects
				
				FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_InsertONLY_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams( item_List );
			}
			
			//  Clear Batch List since All Saved
			
			item_List.clear();
		}
		
	}
	
}
