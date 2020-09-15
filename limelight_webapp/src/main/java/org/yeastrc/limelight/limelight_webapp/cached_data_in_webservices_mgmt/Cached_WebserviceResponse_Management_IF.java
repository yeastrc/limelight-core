package org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt;

public interface Cached_WebserviceResponse_Management_IF {

	/**
	 * @param controllerPath
	 * @param requestPostBody
	 * @return null if not in cache
	 */
	byte[] getCachedResponse(String controllerPath, byte[] requestPostBody);

	/**
	 * @param controllerPath
	 * @param requestPostBody
	 * @param responseBodyBytes
	 */
	void putCachedResponse(String controllerPath, byte[] requestPostBody, byte[] responseBodyBytes);

}