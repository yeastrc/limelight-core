package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmReporterIonMassDTO;

/**
 * Insert Batches into table psm_reporter_ion_mass_tbl 
 * 
 * DB_Insert_PsmReporterIonMassDAO  
 *
 */
public class DB_Insert_PsmReporterIonMass_BatchInserter_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmReporterIonMass_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_Insert_PsmReporterIonMass_BatchInserter_DAO() { }
	public static DB_Insert_PsmReporterIonMass_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmReporterIonMass_BatchInserter_DAO singletonInstance = new DB_Insert_PsmReporterIonMass_BatchInserter_DAO();
	
	private List<PsmReporterIonMassDTO> psmReporterIonMassDTOList = new ArrayList<>( INSERT_BATCH_SIZE );

	/**
	 * Insert last stored batch into DB
	 * 
	 * @throws Exception 
	 */
	public void insert_LAST_Batch_ToDB() throws Exception {
		

		if ( ! psmReporterIonMassDTOList.isEmpty() ) {

			//  Batch not empty so save
			
			_saveBatch();
		}
	}
	

	/**
	 * @param psmOpenModificationDTO
	 * @param psmReporterIonMassDTOList
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			PsmReporterIonMassDTO psmReporterIonMassDTO
			
			) throws Exception {

		{
			//  Add to Batch

			psmReporterIonMassDTOList.add(psmReporterIonMassDTO);
		}

		if ( psmReporterIonMassDTOList.size() >= INSERT_BATCH_SIZE ) {
			
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

			DB_Insert_PsmReporterIonMassDAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(psmReporterIonMassDTOList);
		}

		//  Clear Batch List since All Saved

		psmReporterIonMassDTOList.clear();
	}
		
}
