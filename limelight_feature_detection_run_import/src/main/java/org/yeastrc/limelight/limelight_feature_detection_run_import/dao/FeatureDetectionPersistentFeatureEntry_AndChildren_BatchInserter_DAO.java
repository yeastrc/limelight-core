package org.yeastrc.limelight.limelight_feature_detection_run_import.dao;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionPersistentFeatureEntry_InsertId_DAO.FeatureDetectionPersistentFeatureEntry_DAO__BatchIds_Start_End;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntryDTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO;

/**
 * Insert Batches into table feature_detection_persistent_feature_entry_tbl and Children Tables
 * 
 * FeatureDetectionPersistentFeatureEntry_AndChildren_BatchInserter_DAO  And Children
 *
 */
public class FeatureDetectionPersistentFeatureEntry_AndChildren_BatchInserter_DAO {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionPersistentFeatureEntry_AndChildren_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private FeatureDetectionPersistentFeatureEntry_AndChildren_BatchInserter_DAO() { }
	public static FeatureDetectionPersistentFeatureEntry_AndChildren_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static FeatureDetectionPersistentFeatureEntry_AndChildren_BatchInserter_DAO singletonInstance = new FeatureDetectionPersistentFeatureEntry_AndChildren_BatchInserter_DAO();
	
	private List<Internal_SaveHolder_AndChildren> saveHolder_AndChildren_List = new ArrayList<>( INSERT_BATCH_SIZE );
	
	/**
	 * Insert last stored batch into DB
	 * 
	 * @throws Exception 
	 */
	public void insert_LAST_Batch_ToDB() throws Exception {
		
		System.out.println( "insert_LAST_Batch_ToDB()" );

		if ( ! saveHolder_AndChildren_List.isEmpty() ) {
			
			System.out.println( "insert_LAST_Batch_ToDB()  ( ! saveHolder_AndChildren_List.isEmpty() )" );

			//  Batch not empty so save
			
			_saveBatch();
		}

		//  Call to 'insert_LAST_Batch_ToDB()' is required to insert last batch into DB
		
		FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumber_InsertOnly_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
	}
	
	

	/**
	 * @param featureDetectionPersistentFeatureEntryDTO
	 * @param featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO
	 * @param featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List
	 * @throws Exception 
	 */
	public void insert_Batching_ObjectAndChildren(

			FeatureDetectionPersistentFeatureEntryDTO featureDetectionPersistentFeatureEntryDTO,

			FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO,
			List<FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO> featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List
			
			) throws Exception {

		{
			//  Add to Batch
			
			Internal_SaveHolder_AndChildren internal_SaveHolder_AndChildren = new Internal_SaveHolder_AndChildren();
			internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntryDTO = featureDetectionPersistentFeatureEntryDTO;
			internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO = featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO;
			internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List = featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List;

			saveHolder_AndChildren_List.add(internal_SaveHolder_AndChildren);
		}

		if ( saveHolder_AndChildren_List.size() >= INSERT_BATCH_SIZE ) {

			//  At Batch Size so save
			
			_saveBatch();
		}
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void _saveBatch() throws Exception {

		{
			//  Assign 'id' to top level featureDetectionPersistentFeatureEntryDTO objects

			FeatureDetectionPersistentFeatureEntry_DAO__BatchIds_Start_End batchIds_Start_End = 
					FeatureDetectionPersistentFeatureEntry_InsertId_DAO.getSingletonInstance().getNextBatch_IDs(INSERT_BATCH_SIZE);

			int persistentFeatureEntry_ID = batchIds_Start_End.getId_Start();

			for ( Internal_SaveHolder_AndChildren internal_SaveHolder_AndChildren : saveHolder_AndChildren_List ) {

				if ( persistentFeatureEntry_ID > batchIds_Start_End.getId_End() ) {

					String msg = "persistentFeatureEntry_ID > batchIds_Start_End.getId_End(). persistentFeatureEntry_ID : " 
							+ persistentFeatureEntry_ID
							+ ", batchIds_Start_End.getId_End(): " + batchIds_Start_End.getId_End();
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				}

				internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntryDTO.setId( persistentFeatureEntry_ID );

				persistentFeatureEntry_ID++;
			}
		}

		{  //  Save Top Level featureDetectionPersistentFeatureEntryDTO objects

			List<FeatureDetectionPersistentFeatureEntryDTO> featureDetectionPersistentFeatureEntryDTO_List = new ArrayList<>( saveHolder_AndChildren_List.size() );

			for ( Internal_SaveHolder_AndChildren internal_SaveHolder_AndChildren : saveHolder_AndChildren_List ) {

				featureDetectionPersistentFeatureEntryDTO_List.add( internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntryDTO );
			}

			FeatureDetectionPersistentFeatureEntry_InsertONLY_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams( featureDetectionPersistentFeatureEntryDTO_List );
		}


		{
			//  Insert Children records

			for ( Internal_SaveHolder_AndChildren internal_SaveHolder_AndChildren : saveHolder_AndChildren_List ) {

				if ( internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO != null ) {

					internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO.setFeatureDetectionPersistentFeatureEntryId( internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntryDTO.getId() );

					FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_BatchInserter_DAO.getSingletonInstance()
					.insert_Batching_Object( internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO );
				}

				if ( internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List != null ) {

					for ( FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO entry_MS_2_ScanNumber : internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List ) {

						entry_MS_2_ScanNumber.setFeatureDetectionPersistentFeatureEntryId( internal_SaveHolder_AndChildren.featureDetectionPersistentFeatureEntryDTO.getId() );

						FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumber_InsertOnly_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( entry_MS_2_ScanNumber );
					}
				}
			}

		}

		//  Clear Batch List since All Saved
		
		saveHolder_AndChildren_List.clear();
	}
	
	
	
	
	/**
	 * Internal Object 
	 *
	 */
	private static class Internal_SaveHolder_AndChildren {

		private FeatureDetectionPersistentFeatureEntryDTO featureDetectionPersistentFeatureEntryDTO;

		private FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO;
		private List<FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO> featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List;
	}
	
}
