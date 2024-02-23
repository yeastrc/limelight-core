package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPosition_DescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_InsertId_DAO.DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation__BatchIds_Start_End;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * Insert Batches into table psm_open_modification_position_dscrptv_annttn_tbl and Children Tables
 * 
 * DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_InsertOnly_DAO  And Children
 *
 */
public class DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO implements DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO() {
		
		DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().register(this);
	}
	
	/**
	 * @return singletonInstance
	 */
	public static DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO singletonInstance = new DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO();
	
	private List<PsmOpenModificationPosition_DescriptiveAnnotationDTO> psmOpenModificationPosition_DescriptiveAnnotationDTO_List = new ArrayList<>( INSERT_BATCH_SIZE );
	
	private volatile boolean insert_LAST_Batch_ToDB;

	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF#has_InsertLastBatch_ToDB_HasBeenCalled()
	 */
	@Override
	public boolean has_InsertLastBatch_ToDB_HasBeenCalled() {

		return insert_LAST_Batch_ToDB;
	}
	
	

	/**
	 * Insert last stored batch into DB
	 * 
	 * @throws Exception 
	 */
	public void insert_LAST_Batch_ToDB() throws Exception {
		
		log.info( "insert_LAST_Batch_ToDB()" );
		
		insert_LAST_Batch_ToDB = true;

		if ( ! psmOpenModificationPosition_DescriptiveAnnotationDTO_List.isEmpty() ) {
			
			log.info( "insert_LAST_Batch_ToDB()  ( ! psmOpenModificationPosition_DescriptiveAnnotationDTO_List.isEmpty() )" );

			//  Batch not empty so save
			
			_saveBatch();
		}

		//  Call to 'insert_LAST_Batch_ToDB()' is required to insert last batch into DB
		
		DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotationLargeValue_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
	}
	
	
	/**
	 * @param psmOpenModificationPosition_DescriptiveAnnotationDTO
	 * @throws Exception
	 */
	public void insert_Batching_Object(

			PsmOpenModificationPosition_DescriptiveAnnotationDTO psmOpenModificationPosition_DescriptiveAnnotationDTO

			) throws Exception {
		
		if ( insert_LAST_Batch_ToDB ) {
			String msg = "Invalid to call insert_Batching_Object(...) after call insert_LAST_Batch_ToDB()";
			log.error(msg);
			throw new LimelightImporterInternalException(msg);
		}

		{
			//  Add to Batch
			
			psmOpenModificationPosition_DescriptiveAnnotationDTO_List.add(psmOpenModificationPosition_DescriptiveAnnotationDTO);
		}

		if ( psmOpenModificationPosition_DescriptiveAnnotationDTO_List.size() >= INSERT_BATCH_SIZE ) {
			
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
			//  Assign 'id' to top level PsmOpenModificationPosition_DescriptiveAnnotationDTO objects

			DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation__BatchIds_Start_End batchIds_Start_End = 
					DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_InsertId_DAO.getSingletonInstance().getNextBatch_IDs( psmOpenModificationPosition_DescriptiveAnnotationDTO_List.size() );

			long psmDescriptiveAnnotation_ID = batchIds_Start_End.getId_Start();

			for ( PsmOpenModificationPosition_DescriptiveAnnotationDTO psmOpenModificationPosition_DescriptiveAnnotationDTO : psmOpenModificationPosition_DescriptiveAnnotationDTO_List ) {

				if ( psmDescriptiveAnnotation_ID > batchIds_Start_End.getId_End() ) {

					String msg = "psmDescriptiveAnnotation_ID > batchIds_Start_End.getId_End(). psmDescriptiveAnnotation_ID : " 
							+ psmDescriptiveAnnotation_ID
							+ ", batchIds_Start_End.getId_End(): " + batchIds_Start_End.getId_End();
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}

				psmOpenModificationPosition_DescriptiveAnnotationDTO.setId( psmDescriptiveAnnotation_ID );

				psmDescriptiveAnnotation_ID++;
			}
		}

		{  //  Save Top Level PsmOpenModificationPosition_DescriptiveAnnotationDTO objects

			DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_InsertOnly_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams( psmOpenModificationPosition_DescriptiveAnnotationDTO_List );
		}

			
		//  Clear Batch List since All Saved

		psmOpenModificationPosition_DescriptiveAnnotationDTO_List.clear();
	}
	
	
}
