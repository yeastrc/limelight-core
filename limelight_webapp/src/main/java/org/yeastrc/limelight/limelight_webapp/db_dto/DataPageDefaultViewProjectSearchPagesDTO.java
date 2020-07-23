package org.yeastrc.limelight.limelight_webapp.db_dto;

/**
 * table data_page_default_view_project_search_pages_tbl
 *
 */
public class DataPageDefaultViewProjectSearchPagesDTO {

	private int id;
	private int projectSearchId;
	private String pageControllerPath;
	
	
	private String urlStartAtPageControllerPath;
	private String searchDataLookupParamsString;

	private int userIdCreated;
	private int userIdLastUpdated;

	@Override
	public String toString() {
		return "DataPageDefaultViewProjectSearchPagesDTO [id=" + id + ", projectSearchId=" + projectSearchId
				+ ", pageControllerPath=" + pageControllerPath + ", urlStartAtPageControllerPath="
				+ urlStartAtPageControllerPath + ", searchDataLookupParamsString=" + searchDataLookupParamsString
				+ ", userIdCreated=" + userIdCreated + ", userIdLastUpdated=" + userIdLastUpdated + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPageControllerPath() {
		return pageControllerPath;
	}
	public void setPageControllerPath(String pageControllerPath) {
		this.pageControllerPath = pageControllerPath;
	}
	public int getUserIdCreated() {
		return userIdCreated;
	}
	public void setUserIdCreated(int userIdCreated) {
		this.userIdCreated = userIdCreated;
	}
	public int getUserIdLastUpdated() {
		return userIdLastUpdated;
	}
	public void setUserIdLastUpdated(int userIdLastUpdated) {
		this.userIdLastUpdated = userIdLastUpdated;
	}
	public String getUrlStartAtPageControllerPath() {
		return urlStartAtPageControllerPath;
	}
	public void setUrlStartAtPageControllerPath(String urlStartAtPageControllerPath) {
		this.urlStartAtPageControllerPath = urlStartAtPageControllerPath;
	}
	public String getSearchDataLookupParamsString() {
		return searchDataLookupParamsString;
	}
	public void setSearchDataLookupParamsString(String searchDataLookupParamsString) {
		this.searchDataLookupParamsString = searchDataLookupParamsString;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
}
