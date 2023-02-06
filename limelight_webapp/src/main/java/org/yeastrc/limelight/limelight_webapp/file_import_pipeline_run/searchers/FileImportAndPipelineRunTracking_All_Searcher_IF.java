package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.objects.FileTrackingIdStatusId;

public interface FileImportAndPipelineRunTracking_All_Searcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */

	List<FileImportAndPipelineRunTrackingDTO> getAllForWebDisplayForProject(int projectId) throws Exception;

	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */

	List<FileTrackingIdStatusId> getAllStatusExceptInitInsertForProject(int projectId) throws Exception;

}