package org.yeastrc.limelight.limelight_webapp.dao;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_UploadedFileContents_DTO;

public interface GoldStandard_UploadedFileContents_DAO_IF {

	GoldStandard_UploadedFileContents_DTO getFor_GoldStandard_RootId( int goldStandard_RootId ) throws Exception;
	
	/**
	 * @param item
	 */
	void save(GoldStandard_UploadedFileContents_DTO item);

}