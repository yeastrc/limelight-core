package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto;

import java.util.List;

/**
 * 
 * When Serialized to JSON, stored in FileImportTrackingDataJSONBlob_DTO.jsonContents
 * 
 * Version 001
 *
 */
public class FileImportTrackingDataJSON_Contents_Version_Number_001 {

	public static final int VERSION_NUMBER_001 = 1;
	
	private boolean versionNumber_001 = true;  //  Fail deserialize if this member does not exist
	
	private FileImportTrackingDataJSON_Contents__SearchTagStrings__Version_Number_001 searchTagStrings; 
	
	private FileImportTrackingDataJSON_Contents__SearchTagCategories_AndTheir_SearchTagStrings__Version_Number_001 searchTagCategories_AndTheir_SearchTagStrings;
	
	
	//  Sub Classes
	
	public static class FileImportTrackingDataJSON_Contents__SearchTagStrings__Version_Number_001 {
		
		private List<String> searchTagList;

		public List<String> getSearchTagList() {
			return searchTagList;
		}
		public void setSearchTagList(List<String> searchTagList) {
			this.searchTagList = searchTagList;
		}
	}
	
	public static class FileImportTrackingDataJSON_Contents__SearchTagCategories_AndTheir_SearchTagStrings__Version_Number_001 {
		
		private List<FileImportTrackingDataJSON_Contents__SearchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry__Version_Number_001> searchTagCategoryList;

		public List<FileImportTrackingDataJSON_Contents__SearchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry__Version_Number_001> getSearchTagCategoryList() {
			return searchTagCategoryList;
		}

		public void setSearchTagCategoryList(
				List<FileImportTrackingDataJSON_Contents__SearchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry__Version_Number_001> searchTagCategoryList) {
			this.searchTagCategoryList = searchTagCategoryList;
		}

	}

	public static class FileImportTrackingDataJSON_Contents__SearchTagCategory_AndIts_SearchTagStrings__SingleCategoryEntry__Version_Number_001 {
		
		private String categoryLabel;
		private List<String> searchTagList;

		public List<String> getSearchTagList() {
			return searchTagList;
		}
		public void setSearchTagList(List<String> searchTagList) {
			this.searchTagList = searchTagList;
		}
		public String getCategoryLabel() {
			return categoryLabel;
		}
		public void setCategoryLabel(String categoryLabel) {
			this.categoryLabel = categoryLabel;
		}
	}
	
	//  Top level Getters and Setters

	public FileImportTrackingDataJSON_Contents__SearchTagStrings__Version_Number_001 getSearchTagStrings() {
		return searchTagStrings;
	}

	public void setSearchTagStrings(
			FileImportTrackingDataJSON_Contents__SearchTagStrings__Version_Number_001 searchTagStrings) {
		this.searchTagStrings = searchTagStrings;
	}

	public boolean isVersionNumber_001() {
		return versionNumber_001;
	}

	public void setVersionNumber_001(boolean versionNumber_001) {
		this.versionNumber_001 = versionNumber_001;
	}

	public FileImportTrackingDataJSON_Contents__SearchTagCategories_AndTheir_SearchTagStrings__Version_Number_001 getSearchTagCategories_AndTheir_SearchTagStrings() {
		return searchTagCategories_AndTheir_SearchTagStrings;
	}

	public void setSearchTagCategories_AndTheir_SearchTagStrings(
			FileImportTrackingDataJSON_Contents__SearchTagCategories_AndTheir_SearchTagStrings__Version_Number_001 searchTagCategories_AndTheir_SearchTagStrings) {
		this.searchTagCategories_AndTheir_SearchTagStrings = searchTagCategories_AndTheir_SearchTagStrings;
	}
}


