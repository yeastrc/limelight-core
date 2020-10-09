package org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt;

public interface Cached_WebserviceResponse_Management_IF {

	/**
	 * @param controllerPathForCachedResponse
	 * @param registeringObject TODO
	 */
	void registerControllerPathForCachedResponse( String controllerPathForCachedResponse, Object registeringObject );
	
	/**
	 * @param controllerPathForCachedResponse
	 * @param requestPostBody
	 * @param callingOjbect TODO
	 * @return null if not in cache
	 */
	byte[] getCachedResponse(String controllerPathForCachedResponse, byte[] requestPostBody, Object callingOjbect) throws Exception;

	/**
	 * @param requestPostBody
	 * @param responseBodyBytes
	 * @param callingObject TODO
	 * @param controllerPath
	 */
	void putCachedResponse(String controllerPathForCachedResponse, byte[] requestPostBody, byte[] responseBodyBytes, Object callingObject) throws Exception;

}