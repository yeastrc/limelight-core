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

import org.yeastrc.limelight.limelight_shared.constants.FieldLengthConstants__LimelightSharedCode;

/**
 * 
 *
 */
public class FieldLengthConstants {

	public static final int FIRST_NAME_MAX_LENGTH = 40;
	public static final int LAST_NAME_MAX_LENGTH = 60;
	public static final int ORGANIZATION_MAX_LENGTH = 2000;
	public static final int EMAIL_MAX_LENGTH = 255;
	public static final int USERNAME_MAX_LENGTH = 40;
	public static final int PASSWORD_MAX_LENGTH = 40;
	
	public static final int PROJECT_SHORT_NAME_MAX_LENGTH = 100; // DB is 255

	//  Search Name and Search Short Name: in DB tables project_search_tbl
	
	//        Keep in sync with Javascript class SearchName_SearchShortName_Max_FieldLengths_Constants
	
	public static final int SEARCH_NAME_MAX_LENGTH = 2000; // DB: 2000
	public static final int SEARCH_SHORT_NAME_MAX_LENGTH = 8; // DB: 50

	//  Search Tag: in DB table project_search_tag_strings_in_project_tbl
	
	//        Keep in sync with Javascript class SearchTag_Max_FieldLengths_Constants
	
	public static final int SEARCH_TAG_CATEGORY_MAX_LENGTH__CATEGORY_LABEL = FieldLengthConstants__LimelightSharedCode.SEARCH_TAG_CATEGORY_MAX_LENGTH__CATEGORY_LABEL; // DB: 500

	public static final int SEARCH_TAG_MAX_LENGTH__TAG_STRING = FieldLengthConstants__LimelightSharedCode.SEARCH_TAG_MAX_LENGTH__TAG_STRING; // DB: 500

	//  Feature Detection User label and description: in DB tables feature_detection_root__project_scnfl_mapping_tbl
	
	//        Keep in sync with Javascript class FeatureDetection_Max_FieldLengths_Constants
	
	public static final int FEATURE_DETECTION_MAX_LENGTH__DISPLAY_LABEL = 8; // DB: 300
	public static final int FEATURE_DETECTION_MAX_LENGTH__DESCRIPTION = 255; // DB: 5000

}
