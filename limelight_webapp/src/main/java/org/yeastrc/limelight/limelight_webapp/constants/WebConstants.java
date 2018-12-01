/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.constants;

public class WebConstants {

	//////////    Values stored in the Application Context and accessible across the application
	
	
	/**
	 * The context of the current web app 
	 */
	public static final String APP_CONTEXT_CONTEXT_PATH = "contextPath";
	

	
	/**
	 * Something to append to JS and CSS file query string to force re-download on web app startup
	 */
	public static final String APP_CONTEXT_JS_CSS_CACHE_BUST = "cacheBustValue";

	/**
	 * Something to append to webservice calls to force page reload on web app restart
	 */
	public static final String APP_CONTEXT_WEBSERVICE_SYNC_TRACKING = "webserviceSyncTracking";

	/**
	 * specific config_system table values
	 */
	public static final String CONFIG_SYSTEM_VALUES_HTML_KEY = "configSystemValues";
	
	
	
	//////////     Values stored in the HTTP Request
	
	

//	public static final String REQUEST_FULL_URL_WITH_QUERY_STRING = "intialIncomingURL";
//
//	public static final String REQUEST_URL_ONLY_UP_TO_WEB_APP_CONTEXT = "intialIncomingURLUpToWebAppContext";

	
	/**
	 * The auth access level for this page, see object AuthAccessLevelForPage
	 */
	public static final String REQUEST_WEB_SESSION_AUTH_ACCESS_LEVEL = "webSessionAuthAccessLevel";
	
	public static final String REQUEST_WEB_SESSION_HEADER_USER_IS_ADMIN = "headerUserIsAdmin";
	
	public static final String REQUEST_WEB_SESSION_HEADER_USER_INFO =  "headerUserInfo";
	
	public static final String REQUEST_WEB_SESSION_HEADER_PROJECT_INFO = "headerProjectInfo";

//	public static final String REQUEST_LOGGED_IN_USER_ID = "loggedInUserId";
	
	public static final String REQUEST_PROJECT_IDS = "projectIds";
	
	/**
	 * Projects serialized to JSON
	 */
	public static final String REQUEST_PROJECT_ENTRIES = "projectEntries";
	
	//  Search Data for Project Search Id Based Pages.
	//  From DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor
	
	public static final String REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_CODE = "searchDataLookupParametersCode";
	public static final String REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_RECORD = "searchDataLookupParametersRecord";
	public static final String REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS = "searchDataLookupParameters";
	public static final String REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_JSON = "searchDataLookupParametersJSON";
	public static final String REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_ROOT_IDS_JSON = "searchDataLookupParametersRootIdsJSON";
	
	//  Default URL for Project Search Id Based Pages.
	//  From Page_UserDefault_SetForJSP

	public static final String REQUEST_DEFAULT_URL = "defaultURL";
	
	//  Project Page:
	
	public static final String REQUEST_PROJECT_PAGE_PROJECT_INFO = "project";
}

