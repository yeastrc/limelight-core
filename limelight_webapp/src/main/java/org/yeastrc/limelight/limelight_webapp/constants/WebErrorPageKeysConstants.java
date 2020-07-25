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

/**
 * Keys for Error page
 *
 */
public class WebErrorPageKeysConstants {

	public static final String RESPONSE_STATUS_CODE = "responseStatusCode";

	/**
	 * If any Project Search Id not found in DB
	 */
	public static final String REQUESTED_SEARCH_NOT_FOUND = "requestedSearchNotFound";
	
	/**
	 * The Project Ids from the Project Search Ids is more than 1
	 */
	public static final String REQUESTED_SEARCHES_FOUND_MORE_THAN_ONE_PROJECT = 
			"requestedSearchesFoundMoreThanOneProject";

	public static final String REQUESTED_DATA_NOT_FOUND = "requestedDataNotFound";

	public static final String URL_FORMAT_INVALID = "urlFormatInvalid";
	
}
