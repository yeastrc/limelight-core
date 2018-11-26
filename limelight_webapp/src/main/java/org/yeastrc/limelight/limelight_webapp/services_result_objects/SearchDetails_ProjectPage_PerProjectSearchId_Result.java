package org.yeastrc.limelight.limelight_webapp.services_result_objects;

import java.util.List;

/**
 * Result Root from Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service
 *
 */
public class SearchDetails_ProjectPage_PerProjectSearchId_Result {


	private List<SearchDetails_ProjectPage_PerProjectSearchId_Item> resultPerProjectSearchId;
	
	/**
	 * true when have a web link or user can add a web link
	 */
	private boolean weblinksShowBlockAlways;

	/**
	 * true when user can add a web link
	 */
	private boolean weblinksShowAddWeblinkLink;

	/**
	 * true when have a comment or user can add a comment
	 */
	private boolean commentsShowBlockAlways;

	public List<SearchDetails_ProjectPage_PerProjectSearchId_Item> getResultPerProjectSearchId() {
		return resultPerProjectSearchId;
	}

	public void setResultPerProjectSearchId(
			List<SearchDetails_ProjectPage_PerProjectSearchId_Item> resultPerProjectSearchId) {
		this.resultPerProjectSearchId = resultPerProjectSearchId;
	}

	public boolean isWeblinksShowBlockAlways() {
		return weblinksShowBlockAlways;
	}

	public void setWeblinksShowBlockAlways(boolean weblinksShowBlockAlways) {
		this.weblinksShowBlockAlways = weblinksShowBlockAlways;
	}

	public boolean isCommentsShowBlockAlways() {
		return commentsShowBlockAlways;
	}

	public void setCommentsShowBlockAlways(boolean commentsShowBlockAlways) {
		this.commentsShowBlockAlways = commentsShowBlockAlways;
	}

	public boolean isWeblinksShowAddWeblinkLink() {
		return weblinksShowAddWeblinkLink;
	}

	public void setWeblinksShowAddWeblinkLink(boolean weblinksShowAddWeblinkLink) {
		this.weblinksShowAddWeblinkLink = weblinksShowAddWeblinkLink;
	}


}
