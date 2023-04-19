package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFile_S3UploadPart_DTO;

public interface FileImportTrackingSingleFile_S3UploadPart_DAO_IF {

	/**
	 * Get on Primary Key
	 * 
	 * @param fileImportTrackingSingleFileId
	 * @param s3_UploadPart_Number
	 * @return
	 * @throws Exception
	 */
	FileImportTrackingSingleFile_S3UploadPart_DTO getFor_FileImportTrackingSingleFileId_S3_UploadPart_Number(

			int fileImportTrackingSingleFileId, int s3_UploadPart_Number) throws Exception;
	
	List<FileImportTrackingSingleFile_S3UploadPart_DTO> getAllFor_FileImportTrackingSingleFileId( int fileImportTrackingSingleFileId ) throws Exception;

	void save(FileImportTrackingSingleFile_S3UploadPart_DTO item);

}