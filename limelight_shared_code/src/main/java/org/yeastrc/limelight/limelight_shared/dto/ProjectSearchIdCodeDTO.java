package org.yeastrc.limelight.limelight_shared.dto;


/**
 * Table project_search_id_code_tbl
 *
 */
public class ProjectSearchIdCodeDTO {

	private int projectSearchId;
	private String projectSearchIdCode;
	private int searchId;
	private int projectId_AtTimeOfInsert;

	@Override
	public String toString() {
		return "ProjectSearchIdCodeDTO [projectSearchId=" + projectSearchId + ", projectSearchIdCode="
				+ projectSearchIdCode + ", searchId=" + searchId + ", projectId_AtTimeOfInsert="
				+ projectId_AtTimeOfInsert + "]";
	}
	
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	public String getProjectSearchIdCode() {
		return projectSearchIdCode;
	}
	public void setProjectSearchIdCode(String projectSearchIdCode) {
		this.projectSearchIdCode = projectSearchIdCode;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public int getProjectId_AtTimeOfInsert() {
		return projectId_AtTimeOfInsert;
	}
	public void setProjectId_AtTimeOfInsert(int projectId_AtTimeOfInsert) {
		this.projectId_AtTimeOfInsert = projectId_AtTimeOfInsert;
	}

}
