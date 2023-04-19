package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;

public interface FileImportAndPipelineRunTrackingSingleFileDAO_IF {

	/**
	 * @param id
	 * @return 
	 * @throws Exception
	 */

	FileImportAndPipelineRunTrackingSingleFileDTO getForId(int id) throws Exception;

	/**
	 * @param trackingId
	 * @return 
	 * @throws Exception
	 */

	List<FileImportAndPipelineRunTrackingSingleFileDTO> getFor_TrackingId(int trackingId) throws Exception;

	/**
	 * @param trackingId
	 * @param fileIndex
	 * @return
	 * @throws Exception
	 */
	List<FileImportAndPipelineRunTrackingSingleFileDTO> getFor_TrackingId_FileIndex(int trackingId, int fileIndex) throws Exception;

	//  Spring DB Transactions
	void save(FileImportAndPipelineRunTrackingSingleFileDTO item);
	
	 void update_AWS_S3_Fields( FileImportAndPipelineRunTrackingSingleFileDTO item );
	
	void update_LocalFile_Fields( FileImportAndPipelineRunTrackingSingleFileDTO item );

	//  Spring DB Transactions
	void update_file_upload_status_id_For_Id(ImportSingleFileUploadStatus fileUploadStatus, int id);

	//  Spring DB Transactions
	void delete_For_Id(int id);

}