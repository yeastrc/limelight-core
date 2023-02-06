package org.yeastrc.limelight.limelight_webapp.dao;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.ProjectScanFilename_SearchScanFile_Mapping_DTO;

public interface ProjectScanFilename_SearchScnFile_Mapping_DAO_IF {

	/**
	 * NOT SET 'id' property on param Project_ScanFile_DTO
	 * 
	 * @param item
	 */

	void save(ProjectScanFilename_SearchScanFile_Mapping_DTO item);

}