package org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.shared_objects;

import java.util.List;

/**
 * JSON for request_data__label_value_pairs__json field in table import_and_pipeline_run_tracking_tbl
 * 
 * Format version stored in field request_data__label_value_pairs__json__format_version_number
 * 
 * Also shared directly with webapp.
 * 
 * !!!!  Javascript needs to be updated if a new version is created.  The version number will be passed to the Javascript which will validate it.   !!!
 *
 */
public class FileImportPipelineRun_LabelValuePairs_JSON_Contents_V001 {

	public static final int VERSION_NUMBER = 1;

	private List<FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001> labelValueList;
	
	
	/**
	 * Single Entry
	 *
	 */
	public static class FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001 {
		
		private String label;
		private String value;
		
		public String getLabel() {
			return label;
		}
		public void setLabel(String label) {
			this.label = label;
		}
		public String getValue() {
			return value;
		}
		public void setValue(String value) {
			this.value = value;
		}
	}


	public List<FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001> getLabelValueList() {
		return labelValueList;
	}


	public void setLabelValueList(
			List<FileImportPipelineRun_LabelValuePairs_JSON_Contents_SingleEntry_V001> labelValueList) {
		this.labelValueList = labelValueList;
	}
}
