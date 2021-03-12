package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Check HttpServletRequest for Accept gzip
 * 
 * Set gzip on HttpServletResponse
 *
 */
@Component
public class RestControllerUtils__Request_Accept_GZip_Response_Set_GZip implements RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF {

	private static final Logger log = LoggerFactory.getLogger( RestControllerUtils__Request_Accept_GZip_Response_Set_GZip.class );
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF#does_HttpServletRequest_Accept_GZip(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public boolean does_HttpServletRequest_Accept_GZip( HttpServletRequest httpServletRequest ) {
		
		String acceptEncoding =
				httpServletRequest.getHeader("Accept-Encoding");
		 boolean acceptGzip = acceptEncoding != null &&
		             acceptEncoding.indexOf("gzip") != -1;
		 
		 return acceptGzip;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF#set_GZIP_On_HttpServletResponse(javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void set_GZIP_On_HttpServletResponse( HttpServletResponse httpServletResponse ) {
		
		 httpServletResponse.addHeader("Content-Encoding", "gzip");
	
	}
}
