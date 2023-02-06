package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao;

import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;

public interface FileImportAndPipelineRunTrackingRunDAO_IF {

	/**
	 * @param id
	 * @return 
	 * @throws Exception
	 */

	FileImportAndPipelineRunTrackingRunDTO getForId(int id) throws Exception;

}