package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.searchers;

public interface FileImportAndPipelineRunTracking_Exists_AtLeastOne_WithStatus_Started_Searcher_IF {

	/**
	 * @return true if at least 1 one found
	 * @throws Exception
	 */

	boolean exists_AtLeastOne_WithStatus_Started() throws Exception;

}