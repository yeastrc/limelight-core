package org.yeastrc.limelight.limelight_webapp.services_result_objects;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;

public class SearchDetails_Core_Item {

	private int projectSearchId;
	private String path;
	private String fastaFilename;
	private String formattedLoadTime;
	private List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList;
	
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getFastaFilename() {
		return fastaFilename;
	}
	public void setFastaFilename(String fastaFilename) {
		this.fastaFilename = fastaFilename;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	public List<SearchProgramsPerSearchDTO> getSearchProgramsPerSearchList() {
		return searchProgramsPerSearchList;
	}
	public void setSearchProgramsPerSearchList(List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList) {
		this.searchProgramsPerSearchList = searchProgramsPerSearchList;
	}
	public String getFormattedLoadTime() {
		return formattedLoadTime;
	}
	public void setFormattedLoadTime(String formattedLoadTime) {
		this.formattedLoadTime = formattedLoadTime;
	}
}
