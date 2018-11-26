package org.yeastrc.limelight.limelight_webapp.searchers_results;

import java.util.Date;

/**
 * Result item from Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher
 *
 */
public class Search__SearchDetailsDisplay_Item {

	private int projectSearchId;
	private int searchId;
	private String path;
	private String fastaFilename;
	private Date importEndTimestamp;
	
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
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public Date getImportEndTimestamp() {
		return importEndTimestamp;
	}
	public void setImportEndTimestamp(Date importEndTimestamp) {
		this.importEndTimestamp = importEndTimestamp;
	}
}
