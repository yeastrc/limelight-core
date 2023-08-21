package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.SearchRepPeptSubGroupDTO;

/**
 * Insert Batches into table search_rep_pept_sub_group_tbl 
 * 
 * DB_Insert_SearchRepPeptSubGroup_DAO  
 *
 */
public class DB_Insert_SearchRepPeptSubGroup__BatchInserter_DAO implements DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchRepPeptSubGroup__BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_Insert_SearchRepPeptSubGroup__BatchInserter_DAO() { 
		DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().register(this);
	}

	/**
	 * @return singletonInstance
	 */
	public static DB_Insert_SearchRepPeptSubGroup__BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_SearchRepPeptSubGroup__BatchInserter_DAO singletonInstance = new DB_Insert_SearchRepPeptSubGroup__BatchInserter_DAO();
	
	private List<SearchRepPeptSubGroupDTO> searchRepPeptSubGroupDTOList = new ArrayList<>( INSERT_BATCH_SIZE );

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

		if ( ! searchRepPeptSubGroupDTOList.isEmpty() ) {

			//  Batch not empty so save
			
			_saveBatch();
		}
	}
	

	/**
	 * @param psmOpenModificationDTO
	 * @param searchRepPeptSubGroupDTOList
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			SearchRepPeptSubGroupDTO searchRepPeptSubGroupDTO
			
			) throws Exception {

		if ( insert_LAST_Batch_ToDB ) {
			String msg = "Invalid to call insert_Batching_Object(...) after call insert_LAST_Batch_ToDB()";
			log.error(msg);
			throw new LimelightImporterInternalException(msg);
		}

		{
			//  Add to Batch

			searchRepPeptSubGroupDTOList.add(searchRepPeptSubGroupDTO);
		}

		if ( searchRepPeptSubGroupDTOList.size() >= INSERT_BATCH_SIZE ) {
			
			//  At Batch Size so save
			
			_saveBatch();
		}
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void _saveBatch() throws Exception {

		{  //  Save  psmOpenModificationDTO objects

			DB_Insert_SearchRepPeptSubGroup_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(searchRepPeptSubGroupDTOList);
		}

		//  Clear Batch List since All Saved

		searchRepPeptSubGroupDTOList.clear();
	}
		
}
