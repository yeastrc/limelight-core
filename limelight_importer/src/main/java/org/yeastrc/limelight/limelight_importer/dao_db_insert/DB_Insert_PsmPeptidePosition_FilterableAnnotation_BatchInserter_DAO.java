package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.PsmPeptidePositionFilterableAnnotationDTO;

/**
 * Insert Batches into table psm_open_modification_position_filtrbl_annttn_tbl 
 * 
 * DB_Insert_PsmPeptidePosition_FilterableAnnotationDAO  
 *
 */
public class DB_Insert_PsmPeptidePosition_FilterableAnnotation_BatchInserter_DAO implements DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmPeptidePosition_FilterableAnnotation_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 5000;

	
	private DB_Insert_PsmPeptidePosition_FilterableAnnotation_BatchInserter_DAO() { 
		DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().register(this);
	}

	/**
	 * @return singletonInstance
	 */
	public static DB_Insert_PsmPeptidePosition_FilterableAnnotation_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmPeptidePosition_FilterableAnnotation_BatchInserter_DAO singletonInstance = new DB_Insert_PsmPeptidePosition_FilterableAnnotation_BatchInserter_DAO();
	
	private List<PsmPeptidePositionFilterableAnnotationDTO> psmPeptidePositionFilterableAnnotationDTOList = new ArrayList<>( INSERT_BATCH_SIZE );

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

		if ( ! psmPeptidePositionFilterableAnnotationDTOList.isEmpty() ) {

			//  Batch not empty so save
			
			_saveBatch();
		}
	}
	

	/**
	 * @param psmModificationDTO
	 * @param psmPeptidePositionFilterableAnnotationDTOList
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			PsmPeptidePositionFilterableAnnotationDTO psmPeptidePositionFilterableAnnotationDTO
			
			) throws Exception {

		if ( insert_LAST_Batch_ToDB ) {
			String msg = "Invalid to call insert_Batching_Object(...) after call insert_LAST_Batch_ToDB()";
			log.error(msg);
			throw new LimelightImporterInternalException(msg);
		}

		{
			//  Add to Batch

			psmPeptidePositionFilterableAnnotationDTOList.add(psmPeptidePositionFilterableAnnotationDTO);
		}

		if ( psmPeptidePositionFilterableAnnotationDTOList.size() >= INSERT_BATCH_SIZE ) {
			
			//  At Batch Size so save
			
			_saveBatch();
		}
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void _saveBatch() throws Exception {

		{  //  Save  psmModificationDTO objects

			DB_Insert_PsmPeptidePosition_FilterableAnnotationDAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(psmPeptidePositionFilterableAnnotationDTOList);
		}

		//  Clear Batch List since All Saved

		psmPeptidePositionFilterableAnnotationDTOList.clear();
	}
		
}
