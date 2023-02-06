package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSONBlob_DTO;

public interface FileImportTrackingDataJSONBlob_DAO_IF {

	/**
	 * @param fileImportTrackingId
	 * @return 
	 * @throws Exception
	 */

	FileImportTrackingDataJSONBlob_DTO getFor_FileImportTrackingId(int fileImportTrackingId) throws Exception;

	//  Spring DB Transactions
	void save(FileImportTrackingDataJSONBlob_DTO item);

}