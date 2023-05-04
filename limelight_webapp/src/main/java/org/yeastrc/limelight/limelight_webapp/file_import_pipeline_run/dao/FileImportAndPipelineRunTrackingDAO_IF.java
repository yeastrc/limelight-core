package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;

public interface FileImportAndPipelineRunTrackingDAO_IF {
	
	/**
	 * @param id
	 * @return
	 * @throws Exception
	 */
	FileImportAndPipelineRunTrackingDTO getForId( int id ) throws Exception;

	/**
	 * @param item
	 */
	void save(FileImportAndPipelineRunTrackingDTO item);
	
	/**
	 * @param item
	 * @return
	 * @throws Exception
	 */
	boolean update__request_data( FileImportAndPipelineRunTrackingDTO item ) throws Exception;
	
	/**
	 * @param status
	 * @param id
	 * @return
	 * @throws Exception
	 */
	boolean updateStatus( FileImportStatus status, int id ) throws Exception;
	
	/**
	 * @param status
	 * @param id_List
	 * @throws Exception
	 */
	void updateStatus_All_IdList( FileImportStatus status, List<Integer> id_List ) throws Exception;

	/**
	 * @param id
	 * @param status_ToExclude - Do NOT update if has this status
	 * @param deletedByUserId
	 * @throws Exception
	 */
	public void setMarkedForDeletionForId_ExcludingStatus( 
			int id, FileImportStatus status_ToExclude,  int deletedByUserId ) throws Exception;

}