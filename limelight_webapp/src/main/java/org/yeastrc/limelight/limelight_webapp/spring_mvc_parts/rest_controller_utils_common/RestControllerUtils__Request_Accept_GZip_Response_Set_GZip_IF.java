package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF {

	/**
	 * Check HttpServletRequest for Accept gzip
	 * 
	 * @param httpServletRequest
	 * @return
	 */
	boolean does_HttpServletRequest_Accept_GZip(HttpServletRequest httpServletRequest);

	/**
	 * Set gzip on HttpServletResponse
	 * 
	 * @param httpServletResponse
	 */
	void set_GZIP_On_HttpServletResponse(HttpServletResponse httpServletResponse);

}