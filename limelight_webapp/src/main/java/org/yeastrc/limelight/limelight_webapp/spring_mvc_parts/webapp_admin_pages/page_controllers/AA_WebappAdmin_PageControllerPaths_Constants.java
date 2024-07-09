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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.webapp_admin_pages.page_controllers;

/**
 * The paths of the Webapp Administration page controllers
 *
 */
public class AA_WebappAdmin_PageControllerPaths_Constants {

	//////////////////////////////////////////
	
	//  All User Pages start with "/admin"


	/**
	 * Place before path on all controllers.   This way the path listed for controllers can be used directly on the page or in Javascript AJAX.
	 */
	public static final String PATH_START_ALL = "/";
	
	
	/**
	 * Main admin Page
	 */
	public static final String ADMIN_MAIN_PAGE_CONTROLLER = "admin";

	/**
	 * Admin Configuration Page
	 */
	public static final String ADMIN_CONFIG_PAGE_CONTROLLER = "admin/pg/config";

	/**
	 * Admin Manage Users Page
	 */
	public static final String ADMIN_MANAGE_USERS_PAGE_CONTROLLER = "admin/pg/manage-users";

	/**
	 * Admin Manage Caching Page
	 */
	public static final String ADMIN_MANAGE_CACHED_DATA_PAGE_CONTROLLER = "admin/pg/manage-cached-data";

	/**
	 * Admin Manage Terms of Service Page
	 */
	public static final String ADMIN_MANAGE_TERMS_OF_SERVICE_PAGE_CONTROLLER = "admin/pg/manage-terms-of-service";
	

	/**
	 * Admin Manage Importer and Pipeline Execution Page - Manages the "Run Importer" process and its spawned processes
	 */
	public static final String ADMIN_MANAGE_IMPORTER_PIPELINE_EXECUTION_PAGE_CONTROLLER = "admin/pg/manage-importer";


	/**
	 * Admin Manage Importer and Pipeline Queue Page - Manage queue of Imports and Pipeline runs to process and being processed
	 */
	public static final String ADMIN_MANAGE_IMPORTER_PIPELINE_QUEUE_PAGE_CONTROLLER = "admin/pg/manage-importer-queue";


	
}
