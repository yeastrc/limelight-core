package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataFromInitJSONBlob_DTO;

public interface FileImportTrackingDataFromInitJSONBlob_DAO_IF {

	/**
	 * @param fileImportTrackingId
	 * @return 
	 * @throws Exception
	 */

	FileImportTrackingDataFromInitJSONBlob_DTO getFor_FileImportTrackingId(int fileImportTrackingId) throws Exception;

	//  Spring DB Transactions
	void save(FileImportTrackingDataFromInitJSONBlob_DTO item);

}