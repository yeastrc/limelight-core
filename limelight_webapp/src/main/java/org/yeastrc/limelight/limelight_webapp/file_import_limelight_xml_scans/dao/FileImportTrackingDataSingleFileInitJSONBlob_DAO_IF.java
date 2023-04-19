package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataSingleFileInitJSONBlob_DTO;

public interface FileImportTrackingDataSingleFileInitJSONBlob_DAO_IF {

	/**
	 * @param fileImportTrackingSingleFileId
	 * @return 
	 * @throws Exception
	 */

	FileImportTrackingDataSingleFileInitJSONBlob_DTO getFor_FileImportTrackingSingleFileId(int fileImportTrackingSingleFileId) throws Exception;

	//  Spring DB Transactions
	void save(FileImportTrackingDataSingleFileInitJSONBlob_DTO item);

}