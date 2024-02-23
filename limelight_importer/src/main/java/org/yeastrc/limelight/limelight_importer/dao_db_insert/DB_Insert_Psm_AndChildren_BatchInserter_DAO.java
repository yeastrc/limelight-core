package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmReporterIonMassDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmSearchSubGroupDTO;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO.DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * Insert Batches into table psm_tbl and Children Tables
 * 
 * DB_Insert_PsmDAO  And Children
 *
 */
public class DB_Insert_Psm_AndChildren_BatchInserter_DAO implements DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Psm_AndChildren_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 2000;
	
	
	/**
	 * Holder of Batch Data 
	 *
	 */
	public static class DB_Insert_Psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren {

		private PsmDTO psmDTO;

		//  Children
		
		List<PsmSearchSubGroupDTO> psmSearchSubGroupDTO__List = new ArrayList<>();
		
		List<PsmDynamicModificationDTO> psmDynamicModificationDTO__List = new ArrayList<>();
		
		List<PsmReporterIonMassDTO> psmReporterIonMassDTO__List = new ArrayList<>();

		List<DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren> saveHolder_PsmOpenModification_AndChildren__List = new ArrayList<>();
		
		List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTO__List = new ArrayList<>();
		
		List<PsmDescriptiveAnnotationDTO> psmAnnotationDTO_Descriptive__List = new ArrayList<>();
		
		List<PsmModificationPositionFilterableAnnotationDTO> psmModificationPositionFilterableAnnotationDTO_Filterable_List;

		List<PsmModificationPositionDescriptiveAnnotationDTO> psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List;
		
		List<PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO> psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List;



		///
		
		public List<PsmSearchSubGroupDTO> getPsmSearchSubGroupDTO__List() {
			return psmSearchSubGroupDTO__List;
		}
		public List<PsmDynamicModificationDTO> getPsmDynamicModificationDTO__List() {
			return psmDynamicModificationDTO__List;
		}
		public List<PsmReporterIonMassDTO> getPsmReporterIonMassDTO__List() {
			return psmReporterIonMassDTO__List;
		}
		public List<DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren> getSaveHolder_PsmOpenModification_AndChildren__List() {
			return saveHolder_PsmOpenModification_AndChildren__List;
		}
		public List<PsmFilterableAnnotationDTO> getPsmFilterableAnnotationDTO__List() {
			return psmFilterableAnnotationDTO__List;
		}
		public List<PsmDescriptiveAnnotationDTO> getPsmAnnotationDTO_Descriptive__List() {
			return psmAnnotationDTO_Descriptive__List;
		}
		public void setPsmDTO(PsmDTO psmDTO) {
			this.psmDTO = psmDTO;
		}
		public List<PsmModificationPositionDescriptiveAnnotationDTO> getPsmModificationPositionDescriptiveAnnotationDTO_Descriptive_List() {
			return psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List;
		}
		public void setPsmModificationPositionDescriptiveAnnotationDTO_Descriptive_List(
				List<PsmModificationPositionDescriptiveAnnotationDTO> psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List) {
			this.psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List = psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List;
		}
		public List<PsmModificationPositionFilterableAnnotationDTO> getPsmModificationPositionFilterableAnnotationDTO_Filterable_List() {
			return psmModificationPositionFilterableAnnotationDTO_Filterable_List;
		}
		public void setPsmModificationPositionFilterableAnnotationDTO_Filterable_List(
				List<PsmModificationPositionFilterableAnnotationDTO> psmModificationPositionFilterableAnnotationDTO_Filterable_List) {
			this.psmModificationPositionFilterableAnnotationDTO_Filterable_List = psmModificationPositionFilterableAnnotationDTO_Filterable_List;
		}
		public List<PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO> getPsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List() {
			return psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List;
		}
		public void setPsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List(
				List<PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO> psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List) {
			this.psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List = psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List;
		}
		
		
	}
	
	/**
	 * Constructor
	 */
	private DB_Insert_Psm_AndChildren_BatchInserter_DAO() { 
		DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().register(this);
	}

	/**
	 * @return singletonInstance
	 */
	public static DB_Insert_Psm_AndChildren_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_Psm_AndChildren_BatchInserter_DAO singletonInstance = new DB_Insert_Psm_AndChildren_BatchInserter_DAO();
	
	private List<DB_Insert_Psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren> saveHolder_AndChildren_List = new ArrayList<>( INSERT_BATCH_SIZE );

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
		

		//  Insert Last Batch by calling:

		DB_Insert_PsmSearchSubGroup_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();

		DB_Insert_PsmDynamicModification_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		DB_Insert_PsmReporterIonMass_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
			
		DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		DB_Insert_PsmFilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();

		DB_Insert_PsmDescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		DB_Insert_PsmModificationPosition_FilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		DB_Insert_PsmModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
		
		DB_Insert_PsmModificationPosition_Worst_FilterableAnnotation_Lookup_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
	}
	
	

	/**
	 * @param psmDTO
	 * @param psmPositionDTO_List
	 * @throws Exception 
	 */
	public void insert_Batching_ObjectAndChildren(

			DB_Insert_Psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren
			
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
			//  Skip Assign 'id' since ALREADY assigned
		}

		{  //  Save Top Level psmDTO objects

			List<PsmDTO> psmDTO_List = new ArrayList<>( saveHolder_AndChildren_List.size() );

			for ( DB_Insert_Psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren : saveHolder_AndChildren_List ) {

				psmDTO_List.add( saveHolder_AndChildren.psmDTO );
			}

			DB_Insert_PsmDAO.getSingletonInstance().insert_NOT_Update_ID_Property_InDTOParams( psmDTO_List );
		}


		{
			//  Insert Children records

			for ( DB_Insert_Psm_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_AndChildren : saveHolder_AndChildren_List ) {

				for ( PsmSearchSubGroupDTO psmSearchSubGroupDTO : saveHolder_AndChildren.psmSearchSubGroupDTO__List ) {
					DB_Insert_PsmSearchSubGroup_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object(psmSearchSubGroupDTO);
				}

				for ( PsmDynamicModificationDTO psmDynamicModificationDTO : saveHolder_AndChildren.psmDynamicModificationDTO__List ) {
					DB_Insert_PsmDynamicModification_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( psmDynamicModificationDTO );
				}

				for ( PsmReporterIonMassDTO psmReporterIonMassDTO : saveHolder_AndChildren.psmReporterIonMassDTO__List ) {
					DB_Insert_PsmReporterIonMass_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object(psmReporterIonMassDTO);
				}

				for ( DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO__SaveHolder_AndChildren saveHolder_PsmOpenModification_AndChildren : saveHolder_AndChildren.saveHolder_PsmOpenModification_AndChildren__List ) {
					DB_Insert_PsmOpenModification_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_Batching_ObjectAndChildren( saveHolder_PsmOpenModification_AndChildren );
				}
				
				for ( PsmFilterableAnnotationDTO psmFilterableAnnotationDTO : saveHolder_AndChildren.psmFilterableAnnotationDTO__List ) {
					DB_Insert_PsmFilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( psmFilterableAnnotationDTO );
				}

				for ( PsmDescriptiveAnnotationDTO psmDescriptiveAnnotationDTO : saveHolder_AndChildren.psmAnnotationDTO_Descriptive__List ) {
					DB_Insert_PsmDescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( psmDescriptiveAnnotationDTO );
				}
				
				if ( saveHolder_AndChildren.psmModificationPositionFilterableAnnotationDTO_Filterable_List != null ) {
					for ( PsmModificationPositionFilterableAnnotationDTO psmModificationPositionFilterableAnnotationDTO : saveHolder_AndChildren.psmModificationPositionFilterableAnnotationDTO_Filterable_List ) {	
						DB_Insert_PsmModificationPosition_FilterableAnnotation_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( psmModificationPositionFilterableAnnotationDTO );
					}
				}

				if ( saveHolder_AndChildren.psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List != null ) {
					for ( PsmModificationPositionDescriptiveAnnotationDTO psmModificationPositionDescriptiveAnnotationDTO : saveHolder_AndChildren.psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List ) {	
						DB_Insert_PsmModificationPosition_DescriptiveAnnotation_AndChildren_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( psmModificationPositionDescriptiveAnnotationDTO );
					}
				}
				
				if ( saveHolder_AndChildren.psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List != null ) {
				
					for ( PsmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO : saveHolder_AndChildren.psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO_List ) {

						DB_Insert_PsmModificationPosition_Worst_FilterableAnnotation_Lookup_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( psmModificationPosition_Worst_FilterableAnnotation_Lookup_DTO );
					}
				}
			}
		}
			
		//  Clear Batch List since All Saved

		saveHolder_AndChildren_List.clear();
	}
	
	


	
}
