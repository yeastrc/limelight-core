package org.yeastrc.limelight.limelight_webapp.services_result_objects;

import java.util.List;

/**
 * Result Item Per Project Search Id from Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service
 *
 */
public class SearchDetails_ProjectPage_PerProjectSearchId_Item {

	private int projectSearchId;
	
	private List<SearchDetails_ProjectPage_SearchFile_Item> searchFileList;
	private List<SearchDetails_ProjectPage_WebLink_Item> webLinkList;
	private List<SearchDetails_ProjectPage_Comment_Item> commentList;

	public int getProjectSearchId() {
		return projectSearchId;
	}

	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}

	public List<SearchDetails_ProjectPage_SearchFile_Item> getSearchFileList() {
		return searchFileList;
	}

	public void setSearchFileList(List<SearchDetails_ProjectPage_SearchFile_Item> searchFileList) {
		this.searchFileList = searchFileList;
	}

	public List<SearchDetails_ProjectPage_WebLink_Item> getWebLinkList() {
		return webLinkList;
	}

	public void setWebLinkList(List<SearchDetails_ProjectPage_WebLink_Item> webLinkList) {
		this.webLinkList = webLinkList;
	}

	public List<SearchDetails_ProjectPage_Comment_Item> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<SearchDetails_ProjectPage_Comment_Item> commentList) {
		this.commentList = commentList;
	}
}
