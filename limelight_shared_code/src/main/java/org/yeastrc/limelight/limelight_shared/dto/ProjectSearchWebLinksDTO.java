package org.yeastrc.limelight.limelight_shared.dto;

/**
 * Table project_search__web_links_tbl
 *
 */
public class ProjectSearchWebLinksDTO {

	private int id;
	private int projectSearchId;
	private Integer userId;
	private String linkURL;
	private String linkLabel;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getLinkURL() {
		return linkURL;
	}
	public void setLinkURL(String linkURL) {
		this.linkURL = linkURL;
	}
	public String getLinkLabel() {
		return linkLabel;
	}
	public void setLinkLabel(String linkLabel) {
		this.linkLabel = linkLabel;
	}
}
