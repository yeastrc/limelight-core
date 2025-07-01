package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTO;

/**
 * Insert Batches into table psm_peptide_position_worst_filterable_annotation_lookup_tbl 
 * 
 * DB_Insert_PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_DAO  
 *
 */
public class DB_Insert_PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_BatchInserter_DAO implements DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 5000;

	
	private DB_Insert_PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_BatchInserter_DAO() { 
		DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().register(this);
	}

	/**
	 * @return singletonInstance
	 */
	public static DB_Insert_PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_BatchInserter_DAO singletonInstance = new DB_Insert_PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_BatchInserter_DAO();
	
	private List<PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTO> psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTOList = new ArrayList<>( INSERT_BATCH_SIZE );

	private volatile boolean insert_LAST_Batch_ToDB;

	
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

		if ( ! psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTOList.isEmpty() ) {

			//  Batch not empty so save
			
			_saveBatch();
		}
	}
	

	/**
	 * @param psmModificationDTO
	 * @param psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTOList
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTO psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTO
			
			) throws Exception {

		if ( insert_LAST_Batch_ToDB ) {
			String msg = "Invalid to call insert_Batching_Object(...) after call insert_LAST_Batch_ToDB()";
			log.error(msg);
			throw new LimelightImporterInternalException(msg);
		}

		{
			//  Add to Batch

			psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTOList.add(psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTO);
		}

		if ( psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTOList.size() >= INSERT_BATCH_SIZE ) {
			
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

			DB_Insert_PsmPeptidePosition_Worst_FilterableAnnotation_Lookup_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTOList);
		}

		//  Clear Batch List since All Saved

		psmPeptidePosition_Worst_FilterableAnnotation_Lookup_DTOList.clear();
	}
		
}
