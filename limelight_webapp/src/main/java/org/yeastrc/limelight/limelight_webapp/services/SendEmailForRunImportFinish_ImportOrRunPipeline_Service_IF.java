package org.yeastrc.limelight.limelight_webapp.services;

import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;

public interface SendEmailForRunImportFinish_ImportOrRunPipeline_Service_IF {

	/**
	 * @param fileImportAndPipelineRunTrackingDTO
	 * @param fileImportAndPipelineRunTrackingRunDTO
	 * @throws Exception
	 */
	void sendEmailForRunImportFinish_ImportOrRunPipeline_Service(
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO,
			FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO) throws Exception;

}