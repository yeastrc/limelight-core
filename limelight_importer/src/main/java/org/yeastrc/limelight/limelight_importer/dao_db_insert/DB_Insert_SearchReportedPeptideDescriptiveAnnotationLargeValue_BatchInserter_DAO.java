package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDescriptiveAnnotation_LargeValue_DTO;

/**
 * Insert Batches into table srch__rep_pept_desc_ann_large_value_tbl 
 * 
 * DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValue_InsertOnly_DAO  
 *
 */
public class DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValue_BatchInserter_DAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValue_BatchInserter_DAO.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValue_BatchInserter_DAO() { }
	public static DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValue_BatchInserter_DAO getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValue_BatchInserter_DAO singletonInstance = new DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValue_BatchInserter_DAO();
	
	private List<SearchReportedPeptideDescriptiveAnnotation_LargeValue_DTO> searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO_List = new ArrayList<>( INSERT_BATCH_SIZE );

	/**
	 * Insert last stored batch into DB
	 * 
	 * @throws Exception 
	 */
	public void insert_LAST_Batch_ToDB() throws Exception {
		

		if ( ! searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO_List.isEmpty() ) {

			//  Batch not empty so save
			
			_saveBatch();
		}
	}
	

	/**
	 * @param psmOpenModificationDTO
	 * @param searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO_List
	 * @throws Exception 
	 */
	public void insert_Batching_Object(

			SearchReportedPeptideDescriptiveAnnotation_LargeValue_DTO searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO
			
			) throws Exception {

		{
			//  Add to Batch

			searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO_List.add(searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO);
		}

		if ( searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO_List.size() >= INSERT_BATCH_SIZE ) {
			
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

			DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValue_InsertOnly_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO_List);
		}

		//  Clear Batch List since All Saved

		searchReportedPeptideDescriptiveAnnotation_LargeValue_DTO_List.clear();
	}
		
}
