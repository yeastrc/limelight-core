package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_PsmDescriptiveAnnotation_InsertId_DAO.DB_Insert_PsmDescriptiveAnnotation__BatchIds_Start_End;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * Insert Batches into table psm_open_modification_tbl and Children Tables
 * 
 * DB_Insert_PsmOpenModification_InsertOnly_DAO  And Children
 *
 */
public class DB_Insert_PsmDescriptiveAnnotation_AndChildren_BatchInserter_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmDescriptiveAnnotation_AndChildren_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_Insert_PsmDescriptiveAnnotation_AndChildren_BatchInserter_DAO() { }
	public static DB_Insert_PsmDescriptiveAnnotation_AndChildren_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_PsmDescriptiveAnnotation_AndChildren_BatchInserter_DAO singletonInstance = new DB_Insert_PsmDescriptiveAnnotation_AndChildren_BatchInserter_DAO();
	
	private List<PsmDescriptiveAnnotationDTO> psmDescriptiveAnnotationDTO_List = new ArrayList<>( INSERT_BATCH_SIZE );
	

	/**
	 * Insert last stored batch into DB
	 * 
	 * @throws Exception 
	 */
	public void insert_LAST_Batch_ToDB() throws Exception {
		
		System.out.println( "insert_LAST_Batch_ToDB()" );

		if ( ! psmDescriptiveAnnotationDTO_List.isEmpty() ) {
			
			System.out.println( "insert_LAST_Batch_ToDB()  ( ! psmDescriptiveAnnotationDTO_List.isEmpty() )" );

			//  Batch not empty so save
			
			_saveBatch();
		}

		//  Call to 'insert_LAST_Batch_ToDB()' is required to insert last batch into DB
		
		DB_Insert_PsmDescriptiveAnnotationLargeValue_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
	}
	
	
	/**
	 * @param PsmDescriptiveAnnotationDTO
	 * @throws Exception
	 */
	public void insert_Batching_Object(

			PsmDescriptiveAnnotationDTO PsmDescriptiveAnnotationDTO

			) throws Exception {

		{
			//  Add to Batch
			
			psmDescriptiveAnnotationDTO_List.add(PsmDescriptiveAnnotationDTO);
		}

		if ( psmDescriptiveAnnotationDTO_List.size() >= INSERT_BATCH_SIZE ) {
			
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
			//  Assign 'id' to top level PsmDescriptiveAnnotationDTO objects

			DB_Insert_PsmDescriptiveAnnotation__BatchIds_Start_End batchIds_Start_End = 
					DB_Insert_PsmDescriptiveAnnotation_InsertId_DAO.getSingletonInstance().getNextBatch_IDs(INSERT_BATCH_SIZE);

			long psmDescriptiveAnnotation_ID = batchIds_Start_End.getId_Start();

			for ( PsmDescriptiveAnnotationDTO psmDescriptiveAnnotationDTO : psmDescriptiveAnnotationDTO_List ) {

				if ( psmDescriptiveAnnotation_ID > batchIds_Start_End.getId_End() ) {

					String msg = "psmDescriptiveAnnotation_ID > batchIds_Start_End.getId_End(). psmDescriptiveAnnotation_ID : " 
							+ psmDescriptiveAnnotation_ID
							+ ", batchIds_Start_End.getId_End(): " + batchIds_Start_End.getId_End();
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}

				psmDescriptiveAnnotationDTO.setId( psmDescriptiveAnnotation_ID );

				psmDescriptiveAnnotation_ID++;
			}
		}

		{  //  Save Top Level PsmDescriptiveAnnotationDTO objects

			DB_Insert_PsmDescriptiveAnnotation_InsertOnly_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams( psmDescriptiveAnnotationDTO_List );
		}

			
		//  Clear Batch List since All Saved

		psmDescriptiveAnnotationDTO_List.clear();
	}
	
	
}
