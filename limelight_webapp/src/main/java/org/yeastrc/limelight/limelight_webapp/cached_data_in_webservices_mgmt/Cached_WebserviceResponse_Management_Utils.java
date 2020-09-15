package org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 *
 */
public class Cached_WebserviceResponse_Management_Utils {

	private static final Logger log = LoggerFactory.getLogger( Cached_WebserviceResponse_Management_Utils.class );
	
	/**
	 * @param controllerPath
	 * @return
	 */
	public static String translate_ControllerPath_For_CachedResponseMgmt( String controllerPath ) {
		
		if ( controllerPath == null || controllerPath.length() == 0 ) {
			String msg = "param controllerPath cannot be null or empty";
			log.error(msg);
			throw new IllegalArgumentException(msg);
		}
		
		String translatedPath = controllerPath.replace( '/', '_' );
		
		return translatedPath;
	}
}
