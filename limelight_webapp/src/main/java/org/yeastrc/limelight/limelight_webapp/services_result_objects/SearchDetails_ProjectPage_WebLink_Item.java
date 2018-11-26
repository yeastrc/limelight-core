package org.yeastrc.limelight.limelight_webapp.services_result_objects;

/**
 * Result Item from Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service
 *
 * List per Project Search Id
 */
public class SearchDetails_ProjectPage_WebLink_Item {

	private int id;
	private String linkURL;
	private String linkLabel;
	private boolean canDelete; 

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public boolean isCanDelete() {
		return canDelete;
	}
	public void setCanDelete(boolean canDelete) {
		this.canDelete = canDelete;
	}

}
