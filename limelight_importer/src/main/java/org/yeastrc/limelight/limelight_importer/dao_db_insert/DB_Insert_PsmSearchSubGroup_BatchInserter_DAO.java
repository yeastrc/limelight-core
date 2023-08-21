package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmSearchSubGroupDTO;

/**
 * Insert Batches into table psm_search_sub_group_tbl 
 * 
 * DB_Insert_PsmSearchSubGroup_DAO  
 *
 */
public class DB_Insert_PsmSearchSubGroup_BatchInserter_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmSearchSubGroup_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_Insert_PsmSearchSubGroup_BatchInserter_DAO() { }
	public static DB_Insert_PsmSearchSubGroup_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmSearchSubGroup_BatchInserter_DAO singletonInstance = new DB_Insert_PsmSearchSubGroup_BatchInserter_DAO();
	
	private List<PsmSearchSubGroupDTO> psmSearchSubGroupDTOList = new ArrayList<>( INSERT_BATCH_SIZE );

	/**
	 * Insert last stored batch into DB
	 * 
	 * @throws Exception 
	 */
	public void insert_LAST_Batch_ToDB() throws Exception {
		

		if ( ! psmSearchSubGroupDTOList.isEmpty() ) {

			//  Batch not empty so save
			
			_saveBatch();
		}
	}
	

	/**
	 * @param psmOpenModificationDTO
	 * @param psmSearchSubGroupDTOList
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			PsmSearchSubGroupDTO psmSearchSubGroupDTO
			
			) throws Exception {

		{
			//  Add to Batch

			psmSearchSubGroupDTOList.add(psmSearchSubGroupDTO);
		}

		if ( psmSearchSubGroupDTOList.size() >= INSERT_BATCH_SIZE ) {
			
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

			DB_Insert_PsmSearchSubGroup_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(psmSearchSubGroupDTOList);
		}

		//  Clear Batch List since All Saved

		psmSearchSubGroupDTOList.clear();
	}
		
}
