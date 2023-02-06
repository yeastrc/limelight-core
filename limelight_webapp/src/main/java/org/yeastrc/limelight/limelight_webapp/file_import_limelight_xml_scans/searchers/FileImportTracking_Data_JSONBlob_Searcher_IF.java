package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSONBlob_DTO;

public interface FileImportTracking_Data_JSONBlob_Searcher_IF {

	/**
	 * @param fileImportTrackingId_List
	 * @return
	 * @throws Exception
	 */

	List<FileImportTrackingDataJSONBlob_DTO> getFor_FileImportTrackingId_List(List<Integer> fileImportTrackingId_List)
			throws Exception;

}