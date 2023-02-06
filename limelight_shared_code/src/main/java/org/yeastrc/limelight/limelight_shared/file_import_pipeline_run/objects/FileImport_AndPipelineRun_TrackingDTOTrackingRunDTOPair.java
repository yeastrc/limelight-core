package org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.objects;

import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;

public class FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair {

	private FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO;
	private FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO;
	
	public FileImportAndPipelineRunTrackingDTO getFileImportAndPipelineRunTrackingDTO() {
		return fileImportAndPipelineRunTrackingDTO;
	}
	public void setFileImportAndPipelineRunTrackingDTO(
			FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO) {
		this.fileImportAndPipelineRunTrackingDTO = fileImportAndPipelineRunTrackingDTO;
	}
	public FileImportAndPipelineRunTrackingRunDTO getFileImportAndPipelineRunTrackingRunDTO() {
		return fileImportAndPipelineRunTrackingRunDTO;
	}
	public void setFileImportAndPipelineRunTrackingRunDTO(
			FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO) {
		this.fileImportAndPipelineRunTrackingRunDTO = fileImportAndPipelineRunTrackingRunDTO;
	}
}