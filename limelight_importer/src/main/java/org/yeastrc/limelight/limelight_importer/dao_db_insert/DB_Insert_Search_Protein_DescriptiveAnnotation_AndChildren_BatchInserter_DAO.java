package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_DescriptiveAnnotation_DTO;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_Search_Protein_DescriptiveAnnotation_InsertId_DAO.DB_Insert_Search_Protein_DescriptiveAnnotation__BatchIds_Start_End;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * Insert Batches into table srch__protein_descriptive_annotation_tbl and Children Tables
 * 
 * DB_Insert_Search_Protein_DescriptiveAnnotation_InsertOnly_DAO  And Children
 *
 */
public class DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO implements DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO() { 

		DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().register(this);
	}
	public static DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO singletonInstance = new DB_Insert_Search_Protein_DescriptiveAnnotation_AndChildren_BatchInserter_DAO();
	
	private List<Search_Protein_DescriptiveAnnotation_DTO> search_Protein_DescriptiveAnnotationDTO_List = new ArrayList<>( INSERT_BATCH_SIZE );

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

		if ( ! search_Protein_DescriptiveAnnotationDTO_List.isEmpty() ) {
			
			log.info( "insert_LAST_Batch_ToDB()  ( ! search_Protein_DescriptiveAnnotationDTO_List.isEmpty() )" );

			//  Batch not empty so save
			
			_saveBatch();
		}

		//  Call to 'insert_LAST_Batch_ToDB()' is required to insert last batch into DB
		
		DB_Insert_Search_Protein_DescriptiveAnnotationLargeValue_BatchInserter_DAO.getSingletonInstance().insert_LAST_Batch_ToDB();
	}
	
	
	/**
	 * @param Search_Protein_DescriptiveAnnotation_DTO
	 * @throws Exception
	 */
	public void insert_Batching_Object(

			Search_Protein_DescriptiveAnnotation_DTO search_Protein_DescriptiveAnnotationDTO

			) throws Exception {

		if ( insert_LAST_Batch_ToDB ) {
			String msg = "Invalid to call insert_Batching_Object(...) after call insert_LAST_Batch_ToDB()";
			log.error(msg);
			throw new LimelightImporterInternalException(msg);
		}

		{
			//  Add to Batch
			
			search_Protein_DescriptiveAnnotationDTO_List.add(search_Protein_DescriptiveAnnotationDTO);
		}

		if ( search_Protein_DescriptiveAnnotationDTO_List.size() >= INSERT_BATCH_SIZE ) {
			
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
			//  Assign 'id' to top level Search_Protein_DescriptiveAnnotationDTO objects

			DB_Insert_Search_Protein_DescriptiveAnnotation__BatchIds_Start_End batchIds_Start_End = 
					DB_Insert_Search_Protein_DescriptiveAnnotation_InsertId_DAO.getSingletonInstance().getNextBatch_IDs( search_Protein_DescriptiveAnnotationDTO_List.size() );

			long search_Protein_DescriptiveAnnotation_ID = batchIds_Start_End.getId_Start();

			for ( Search_Protein_DescriptiveAnnotation_DTO search_Protein_DescriptiveAnnotationDTO : search_Protein_DescriptiveAnnotationDTO_List ) {

				if ( search_Protein_DescriptiveAnnotation_ID > batchIds_Start_End.getId_End() ) {

					String msg = "search_Protein_DescriptiveAnnotation_ID > batchIds_Start_End.getId_End(). search_Protein_DescriptiveAnnotation_ID : " 
							+ search_Protein_DescriptiveAnnotation_ID
							+ ", batchIds_Start_End.getId_End(): " + batchIds_Start_End.getId_End();
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}

				search_Protein_DescriptiveAnnotationDTO.setId( search_Protein_DescriptiveAnnotation_ID );

				search_Protein_DescriptiveAnnotation_ID++;
			}
		}

		{  //  Save Top Level Search_Protein_DescriptiveAnnotationDTO objects

			DB_Insert_Search_Protein_DescriptiveAnnotation_InsertOnly_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams( search_Protein_DescriptiveAnnotationDTO_List );
		}

			
		//  Clear Batch List since All Saved

		search_Protein_DescriptiveAnnotationDTO_List.clear();
	}
	
	
}
