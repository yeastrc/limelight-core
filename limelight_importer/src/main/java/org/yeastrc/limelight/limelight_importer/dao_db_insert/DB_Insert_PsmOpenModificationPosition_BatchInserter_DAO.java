package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;

/**
 * Insert Batches into table psm_open_modification_tbl and Children Tables
 * 
 * DB_Insert_PsmOpenModification_InsertOnly_DAO  And Children
 *
 */
public class DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO() { }
	public static DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO singletonInstance = new DB_Insert_PsmOpenModificationPosition_BatchInserter_DAO();
	
	private List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTO_List = new ArrayList<>( INSERT_BATCH_SIZE );

	/**
	 * Insert last stored batch into DB
	 * 
	 * @throws Exception 
	 */
	public void insert_LAST_Batch_ToDB() throws Exception {
		

		if ( ! psmOpenModificationPositionDTO_List.isEmpty() ) {

			//  Batch not empty so save
			
			_saveBatch();
		}
	}
	

	/**
	 * @param psmOpenModificationDTO
	 * @param psmOpenModificationPositionDTO_List
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			PsmOpenModificationPositionDTO psmOpenModificationPositionDTO
			
			) throws Exception {

		{
			//  Add to Batch

			psmOpenModificationPositionDTO_List.add(psmOpenModificationPositionDTO);
		}

		if ( psmOpenModificationPositionDTO_List.size() >= INSERT_BATCH_SIZE ) {
			
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

			DB_Insert_PsmOpenModificationPosition_InsertOnly_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(psmOpenModificationPositionDTO_List);
		}

		//  Clear Batch List since All Saved

		psmOpenModificationPositionDTO_List.clear();
	}
		
}
