package org.yeastrc.limelight.limelight_webapp.db_dto;

/**
 * table data_page_default_view_project_search_pages_tbl
 *
 */
public class DataPageDefaultViewExperimentPagesDTO {

	private int id;
	private int projectId;
	private String pageControllerPath;
	
	private Integer experimentIdDefaultView;  // only for experiment - Default View
	private Integer singleProjectSearchIdDefaultView;
	
	private String urlStartAtPageControllerPath;
	private String searchDataLookupParamsString;

	private int userIdCreated;
	private int userIdLastUpdated;
	
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
	public Integer getSingleProjectSearchIdDefaultView() {
		return singleProjectSearchIdDefaultView;
	}
	public void setSingleProjectSearchIdDefaultView(Integer singleProjectSearchIdDefaultView) {
		this.singleProjectSearchIdDefaultView = singleProjectSearchIdDefaultView;
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
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public Integer getExperimentIdDefaultView() {
		return experimentIdDefaultView;
	}
	public void setExperimentIdDefaultView(Integer experimentIdDefaultView) {
		this.experimentIdDefaultView = experimentIdDefaultView;
	}
}
