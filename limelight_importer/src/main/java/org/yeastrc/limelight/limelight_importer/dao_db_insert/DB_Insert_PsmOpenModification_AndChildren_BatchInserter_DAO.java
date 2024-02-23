package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationDTO;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO.DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModification_InsertId_DAO.DB_Insert_PsmOpenModification__BatchIds_Start_End;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * Insert Batches into table psm_open_modification_tbl and Children Tables
 * 
 * DB_Insert_PsmOpenModification_InsertOnly_DAO  And Children
 *
 */
public class DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO implements DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;
	
	
	/**
	 * Holder of Batch Data 
	 *
	 */
	public static class DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren {

		private PsmOpenModificationDTO psmOpenModificationDTO;

		//  Children
		private List<DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren> psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List;

		public void setPsmOpenModificationDTO(PsmOpenModificationDTO psmOpenModificationDTO) {
			this.psmOpenModificationDTO = psmOpenModificationDTO;
		}

		public void setPsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List(
				List<DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren> psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List) {
			this.psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List = psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List;
		}
	}
	
	/**
	 * Constructor
	 */
	private DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO() { 
		DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().register(this);
	}

	/**
	 * @return singletonInstance
	 */
	public static DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO singletonInstance = new DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO();
	
	private List<DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren> saveHolder_AndChildren_List = new ArrayList<>( INSERT_BATCH_SIZE );

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

		insert_LAST_Batch_ToDB = true;
		
		log.info( "insert_LAST_Batch_ToDB()" );

		if ( ! saveHolder_AndChildren_List.isEmpty() ) {
			
			log.info( "insert_LAST_Batch_ToDB()  ( ! saveHolder_AndChildren_List.isEmpty() )" );

			//  Batch not empty so save
			
			_saveBatch();
		}

		//  Call to 'insert_LAST_Batch_ToDB()' is required to insert last batch into DB
		
		DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
	}
	
	

	/**
	 * @param psmOpenModificationDTO
	 * @param psmOpenModificationPositionDTO_List
	 * @throws Exception 
	 */
	public void insert_Batching_ObjectAndChildren(

			DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren
			
			) throws Exception {

		if ( insert_LAST_Batch_ToDB ) {
			String msg = "Invalid to call insert_Batching_Object(...) after call insert_LAST_Batch_ToDB()";
			log.error(msg);
			throw new LimelightImporterInternalException(msg);
		}

		{
			//  Add to Batch
			
			saveHolder_AndChildren_List.add(saveHolder_AndChildren);
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
			//  Assign 'id' to top level psmOpenModificationDTO objects

			DB_Insert_PsmOpenModification__BatchIds_Start_End batchIds_Start_End = 
					DB_Insert_PsmOpenModification_InsertId_DAO.getSingletonInstance().getNextBatch_IDs( saveHolder_AndChildren_List.size() );

			long psmOpenModification_ID = batchIds_Start_End.getId_Start();

			for ( DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren : saveHolder_AndChildren_List ) {

				if ( psmOpenModification_ID > batchIds_Start_End.getId_End() ) {

					String msg = "psmOpenModification_ID > batchIds_Start_End.getId_End(). psmOpenModification_ID : " 
							+ psmOpenModification_ID
							+ ", batchIds_Start_End.getId_End(): " + batchIds_Start_End.getId_End();
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}

				saveHolder_AndChildren.psmOpenModificationDTO.setId( psmOpenModification_ID );

				psmOpenModification_ID++;
			}
		}

		{  //  Save Top Level psmOpenModificationDTO objects

			List<PsmOpenModificationDTO> psmOpenModificationDTO_List = new ArrayList<>( saveHolder_AndChildren_List.size() );

			for ( DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren : saveHolder_AndChildren_List ) {

				psmOpenModificationDTO_List.add( saveHolder_AndChildren.psmOpenModificationDTO );
			}

			DB_Insert_PsmOpenModification_InsertOnly_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams( psmOpenModificationDTO_List );
		}


		{
			//  Insert Children records

			for ( DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren : saveHolder_AndChildren_List ) {

				if ( saveHolder_AndChildren.psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List != null ) {

					for ( DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren : saveHolder_AndChildren.psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren_List ) {

						psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren.getPsmOpenModificationPositionDTO().setPsmOpenModificationId( saveHolder_AndChildren.psmOpenModificationDTO.getId() );
						
						DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( psmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren );
					}
				}
			}
		}
			
		//  Clear Batch List since All Saved

		saveHolder_AndChildren_List.clear();
	}
	
	


	
}
