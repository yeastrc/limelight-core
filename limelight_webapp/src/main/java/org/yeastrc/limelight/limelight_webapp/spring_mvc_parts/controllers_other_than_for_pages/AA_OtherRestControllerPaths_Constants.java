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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controllers_other_than_for_pages;

/**
 * The paths of the other REST controllers 
 *
 */
public class AA_OtherRestControllerPaths_Constants {

	//  All start with "/o/rws/" for other/rest web service
	

	/**
	 * Place before path on all controllers.   This way the path listed for controllers can be used directly on the page or in Javascript AJAX.
	 */
	public static final String PATH_START_ALL = "/";


	public static final String RUN_IMPORTER_IMPORT_FINISH_REST_WEBSERVICE_CONTROLLER = 
			"o/rws/run-importer-import-finish";
	

}
