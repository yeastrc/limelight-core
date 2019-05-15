package org.yeastrc.limelight.limelight_webapp.db_dto;

/**
 * table url_shortener_tbl
 *
 */
public class UrlShortenerDTO {

	private int id;
	private String shortenedUrlKey;

	private Integer userId;
	
	
	private String urlStartAtPageControllerPath;
	private String pageControllerPath;
	private String searchDataLookupParamsString;
	private String remoteUserIPAddress;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getShortenedUrlKey() {
		return shortenedUrlKey;
	}
	public void setShortenedUrlKey(String shortenedUrlKey) {
		this.shortenedUrlKey = shortenedUrlKey;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getUrlStartAtPageControllerPath() {
		return urlStartAtPageControllerPath;
	}
	public void setUrlStartAtPageControllerPath(String urlStartAtPageControllerPath) {
		this.urlStartAtPageControllerPath = urlStartAtPageControllerPath;
	}
	public String getPageControllerPath() {
		return pageControllerPath;
	}
	public void setPageControllerPath(String pageControllerPath) {
		this.pageControllerPath = pageControllerPath;
	}
	public String getSearchDataLookupParamsString() {
		return searchDataLookupParamsString;
	}
	public void setSearchDataLookupParamsString(String searchDataLookupParamsString) {
		this.searchDataLookupParamsString = searchDataLookupParamsString;
	}
	public String getRemoteUserIPAddress() {
		return remoteUserIPAddress;
	}
	public void setRemoteUserIPAddress(String remoteUserIPAddress) {
		this.remoteUserIPAddress = remoteUserIPAddress;
	}

	
}
