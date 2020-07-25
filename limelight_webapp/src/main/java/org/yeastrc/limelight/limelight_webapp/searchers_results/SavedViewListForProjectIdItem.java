package org.yeastrc.limelight.limelight_webapp.searchers_results;

/**
 * Result entry from SavedViewListForProjectIdSearcher
 *
 */
public class SavedViewListForProjectIdItem {

	private int id;
	private String label;
	private String url;
	private int userIdCreated;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getUserIdCreated() {
		return userIdCreated;
	}
	public void setUserIdCreated(int userIdCreated) {
		this.userIdCreated = userIdCreated;
	}
}
