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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.webapp_admin_pages.rest_controllers;

/**
 * The paths of the rest webservice controllers for Webapp Administration
 *
 */
public class AA_WebappAdmin_RestWSControllerPaths_Constants {

	//  All start with "/admin/rws/" for webapp admin rest web service
	
	//  Adding /for-page to differentiate between possible future public web services

	/**
	 * Place before path on all controllers.   This way the path listed for controllers can be used directly on the page or in Javascript AJAX.
	 */
	public static final String PATH_START_ALL = "/";

	///////////////
	
	/**
	 * All paths for admin webservices will start with this string
	 */
	public static final String ADMIN_REST_WEBSERVICE_CONTROLLER_START = "admin/rws/";
	
	//  Admin Config Page
	
	public static final String WEBAPP_ADMIN_CONFIG_GET_CURRENT_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/config-get-current";

	public static final String WEBAPP_ADMIN_CONFIG_SAVE_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/config-save";
	
	//  Terms of Service Management

	public static final String WEBAPP_ADMIN_TERMS_OF_SERVICE_GET_CURRENT_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/terms-of-service-get-current";

	public static final String WEBAPP_ADMIN_TERMS_OF_SERVICE_ADD_CHANGE_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/terms-of-service-add-change";

	public static final String WEBAPP_ADMIN_TERMS_OF_SERVICE_ENABLE_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/terms-of-service-enable";
	public static final String WEBAPP_ADMIN_TERMS_OF_SERVICE_DISABLE_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/terms-of-service-disable";
	
	//  Admin Manage Users Page

	public static final String WEBAPP_ADMIN_MANAGE_USERS_LIST_INVITED_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-users-list-invited";

	public static final String WEBAPP_ADMIN_MANAGE_USERS_LIST_USERS_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-users-list-users";

	public static final String WEBAPP_ADMIN_MANAGE_USERS_USER_ENABLE_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-users-user-enable";

	public static final String WEBAPP_ADMIN_MANAGE_USERS_USER_GLOBAL_ACCESS_LEVEL_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-users-user-global-access-level";

	//  Admin Manage Cached Data Page

	public static final String WEBAPP_ADMIN_MANAGE_CACHED_DATA_CLEAR_ALL_CACHED_DATA_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-cached-data-clear-all-cached-data";

	public static final String WEBAPP_ADMIN_MANAGE_CACHED_DATA_WRITE_CACHED_DATA_SIZE_TO_LOG_FILE_REST_WEBSERVICE_CONTROLLER = 
			"admin/rws/for-page/manage-cached-data-write-cached-data-size-to-log-file";


	//  Admin Manage Run Importer Page

	public static final String WEBAPP_ADMIN_MANAGE_RUN_IMPORTER_PAUSE_GET_CURRENT_STATUS__REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-run-importer-pause-get-current-status";
	
	public static final String WEBAPP_ADMIN_MANAGE_RUN_IMPORTER_PAUSE_GET_REQUESTED_STATUS__REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-run-importer-pause-get-requested-status";
	
	public static final String WEBAPP_ADMIN_MANAGE_IMPORTER_PIPELINE_EXECUTION__UPDATE_REQUESTED_STATUS_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-run-importer-pause-update-requested-status";

	public static final String WEBAPP_ADMIN_MANAGE_IMPORTER_PIPELINE_EXECUTION__PAUSE_SCHEDULE_GET_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-run-importer-pause-schedule-get";

	public static final String WEBAPP_ADMIN_MANAGE_IMPORTER_PIPELINE_EXECUTION__PAUSE_SCHEDULE_INSERT_UPDATE_REST_WEBSERVICE_CONTROLLER = "admin/rws/for-page/manage-run-importer-pause-schedule-insert-update";


	//  Under general User Account since shared code:
	//     Create Account Performed By Admin User

}
