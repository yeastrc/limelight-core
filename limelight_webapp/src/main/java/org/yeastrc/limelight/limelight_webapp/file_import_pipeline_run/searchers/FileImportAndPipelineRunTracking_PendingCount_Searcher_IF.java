package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.searchers;

public interface FileImportAndPipelineRunTracking_PendingCount_Searcher_IF {

	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */

	int getPendingCountForProject(int projectId) throws Exception;

}