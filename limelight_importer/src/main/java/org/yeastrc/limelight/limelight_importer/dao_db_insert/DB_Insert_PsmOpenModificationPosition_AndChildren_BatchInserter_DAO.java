package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModificationPosition_InsertId_DAO.DB_Insert_PsmOpenModificationPosition__BatchIds_Start_End;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPosition_DescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPosition_FilterableAnnotationDTO;

/**
 * Insert Batches into table psm_open_modification_position_tbl and Children Tables
 * 
 * DB_Insert_PsmOpenModification_InsertOnly_DAO  And Children
 *
 */
public class DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO implements DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	/**
	 * Holder of Batch Data 
	 *
	 */
	public static class DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren {

		private PsmOpenModificationPositionDTO psmOpenModificationPositionDTO;

		//  Children
		private List<PsmOpenModificationPosition_FilterableAnnotationDTO> psmOpenModificationPosition_FilterableAnnotationDTO_List;
		private List<PsmOpenModificationPosition_DescriptiveAnnotationDTO> psmOpenModificationPosition_DescriptiveAnnotationDTO_List;

		public void setPsmOpenModificationPositionDTO(PsmOpenModificationPositionDTO psmOpenModificationPositionDTO) {
			this.psmOpenModificationPositionDTO = psmOpenModificationPositionDTO;
		}

		public void setPsmOpenModificationPosition_FilterableAnnotationDTO_List(
				List<PsmOpenModificationPosition_FilterableAnnotationDTO> psmOpenModificationPosition_FilterableAnnotationDTO_List) {
			this.psmOpenModificationPosition_FilterableAnnotationDTO_List = psmOpenModificationPosition_FilterableAnnotationDTO_List;
		}

		public void setPsmOpenModificationPosition_DescriptiveAnnotationDTO_List(
				List<PsmOpenModificationPosition_DescriptiveAnnotationDTO> psmOpenModificationPosition_DescriptiveAnnotationDTO_List) {
			this.psmOpenModificationPosition_DescriptiveAnnotationDTO_List = psmOpenModificationPosition_DescriptiveAnnotationDTO_List;
		}

		public PsmOpenModificationPositionDTO getPsmOpenModificationPositionDTO() {
			return psmOpenModificationPositionDTO;
		}

	}
	
	
	private DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO() {

		DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().register(this);
	}	
	/**
	 * @return singletonInstance
	 */
	public static DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO singletonInstance = new DB_Insert_PsmOpenModificationPosition_AndChildren_BatchInserter_DAO();
	
	private List<DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren> saveHolder_AndChildren_List = new ArrayList<>( INSERT_BATCH_SIZE );

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

		if ( ! saveHolder_AndChildren_List.isEmpty() ) {

			//  Batch not empty so save
			
			_saveBatch();
		}
		
		DB_Insert_PsmOpenModificationPosition_FilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
	}
	

	/**
	 * @param psmOpenModificationDTO
	 * @param psmOpenModificationPositionDTO_List
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren
			
			) throws Exception {

		if ( insert_LAST_Batch_ToDB ) {
			String msg = "Invalid to call insert_Batching_Object(...) after call insert_LAST_Batch_ToDB()";
			log.error(msg);
			throw new LimelightImporterInternalException(msg);
		}

		{
			//  Add to Batch

			this.saveHolder_AndChildren_List.add(saveHolder_AndChildren);
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

			DB_Insert_PsmOpenModificationPosition__BatchIds_Start_End batchIds_Start_End = 
					DB_Insert_PsmOpenModificationPosition_InsertId_DAO.getSingletonInstance().getNextBatch_IDs( saveHolder_AndChildren_List.size() );

			long psmOpenModification_ID = batchIds_Start_End.getId_Start();

			for ( DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren : saveHolder_AndChildren_List ) {

				if ( psmOpenModification_ID > batchIds_Start_End.getId_End() ) {

					String msg = "psmOpenModification_ID > batchIds_Start_End.getId_End(). psmOpenModification_ID : " 
							+ psmOpenModification_ID
							+ ", batchIds_Start_End.getId_End(): " + batchIds_Start_End.getId_End();
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}

				saveHolder_AndChildren.psmOpenModificationPositionDTO.setId( psmOpenModification_ID );

				psmOpenModification_ID++;
			}
		}
		
		{  //  Save Top Level psmOpenModificationDTO objects
			
			List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTO_List = new ArrayList<>( saveHolder_AndChildren_List.size() );
			for ( DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren : saveHolder_AndChildren_List ) {
				psmOpenModificationPositionDTO_List.add( saveHolder_AndChildren.psmOpenModificationPositionDTO );
			}

			DB_Insert_PsmOpenModificationPosition_InsertOnly_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(psmOpenModificationPositionDTO_List);
		}


		{
			//  Insert Children records

			for ( DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren : saveHolder_AndChildren_List ) {

				if ( saveHolder_AndChildren.psmOpenModificationPosition_FilterableAnnotationDTO_List != null ) {

					for ( PsmOpenModificationPosition_FilterableAnnotationDTO entry : saveHolder_AndChildren.psmOpenModificationPosition_FilterableAnnotationDTO_List ) {

						entry.setPsmOpenModificationPositionId( saveHolder_AndChildren.psmOpenModificationPositionDTO.getId() );

						DB_Insert_PsmOpenModificationPosition_FilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( entry );
					}
				}

				if ( saveHolder_AndChildren.psmOpenModificationPosition_DescriptiveAnnotationDTO_List != null ) {

					for ( PsmOpenModificationPosition_DescriptiveAnnotationDTO entry : saveHolder_AndChildren.psmOpenModificationPosition_DescriptiveAnnotationDTO_List ) {

						entry.setPsmOpenModificationPositionId( saveHolder_AndChildren.psmOpenModificationPositionDTO.getId() );

						DB_Insert_PsmOpenModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( entry );
					}
				}
			}
		}
		
		//  Clear Batch List since All Saved

		saveHolder_AndChildren_List.clear();
	}
		
}
