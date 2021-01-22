/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.services;

//import javax.servlet.http.HttpServletRequest;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
//import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;

/**
 * Is the Browser Internet Explorer (Any version)
 * 
 * NOT CURRENTLY CALLED
 *
 */
//@Component
public class BrowserIs_InternetExplorer_Detection_Service 

//implements BrowserIs_InternetExplorer_Detection_ServiceIF 
{
//
//	private static final Logger log = LoggerFactory.getLogger( BrowserIs_InternetExplorer_Detection_Service.class );
//
//	@Autowired
//	private UserSessionManager userSessionManager;
//	
//	/* (non-Javadoc)
//	 * @see org.yeastrc.limelight.limelight_webapp.services.BrowserIs_InternetExplorer_Detection_ServiceIF#browserIs_InternetExplorer_Detection_Service(javax.servlet.http.HttpServletRequest)
//	 */
//	@Override
//	public boolean browserIs_InternetExplorer_Detection_Service( HttpServletRequest httpServletRequest ) {
//		
//
//		try {
//			String userAgentString = httpServletRequest.getHeader("User-Agent");
//
//			if ( userAgentString != null ) {
//
//				//  Works up to IE 10
//				boolean isIE = userAgentString.contains("MSIE");
//
//				//For IE 11
//				boolean isIE11 = userAgentString.contains("rv:11.0");
//
//
//				if ( isIE || isIE11 ) {
//
//
//					if ( log.isDebugEnabled() ) {
//
//						try {
//
//							String requestURL = httpServletRequest.getRequestURL().toString();
//
//							String userSessionUsername = "";
//
//							String username = null;
//
//							try {
//								username = getUsername( httpServletRequest );
//							} catch ( Exception e ) {
//								log.error( "Error getting username" );
//							}
//
//							if ( username != null ) {
//								userSessionUsername = "\t, session username: \t" + username;
//							}
//
//							log.debug( "NO Longer doing Redirect in this code when Browser is Internet Explorer.   Browser is Internet Explorer.  "
//									+ "UserAgent: \t" + userAgentString
//									+ "\t, requested URL: \t" + requestURL
//									+ "\t, remote IP: \t" + httpServletRequest.getRemoteAddr()
//									+ userSessionUsername );
//
//						} catch ( Throwable t ) {
//							log.error( "Failed logging browser/user information when is Browser is Internet Explorer", t );
//							//  Swallow any exceptions getting username
//						}
//					}
//
//					return true;
//				}
//			}
//
//			return false;
//
//		} catch (Exception e) {
//			log.error( "Error determining if Browser is Internet Explorer", e );
//			throw e;
//		}
//	}
//
//	/**
//	 * @param httpRequest
//	 * @return - null if no username
//	 */
//	private String getUsername( HttpServletRequest httpServletRequest ) {
//	
//		UserSession userSession = userSessionManager.getUserSession( httpServletRequest );
//		if ( userSession == null ) {
//			//  No User session 
//			return null;
//		}
//		
//		return userSession.getUsername();
//	}
//	
}
