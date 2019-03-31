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
package org.yeastrc.limelight.limelight_webapp.web_utils;

import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.HeaderStringLengthLimitsConstants;

/**
 * 
 *
 */
@Component
public class TruncateProjectTitleForDisplay implements TruncateProjectTitleForDisplayIF {

	private static final String TRUNCATED_STRING_INDICATOR_APPENDED = "...";

	/**
	 * @param projectTitle
	 * @return
	 */
	@Override
	public String truncateProjectTitleForHeader( String projectTitle ) {
		
		if ( projectTitle == null ) {
			
			throw new IllegalArgumentException( "projectTitle cannot be null" );
		}
		
		if ( projectTitle.length() > HeaderStringLengthLimitsConstants.TITLE_MAX_DISPLAY_LENGTH ) {
			
			projectTitle = projectTitle.substring(0, HeaderStringLengthLimitsConstants.TITLE_MAX_DISPLAY_LENGTH );
			
			projectTitle += TRUNCATED_STRING_INDICATOR_APPENDED;
			
		}
		
		return projectTitle;
	}
	
	/**
	 * @param projectTitle
	 * @return
	 */
	@Override
	public String truncateProjectTitleForHeaderNonUser( String projectTitle ) {
		
		if ( projectTitle == null  ) {
			
			throw new IllegalArgumentException( "projectTitle cannot be null" );
		}
		
		if ( projectTitle.length() > HeaderStringLengthLimitsConstants.TITLE_MAX_DISPLAY_NON_USER_LENGTH ) {
			
			projectTitle = projectTitle.substring(0, HeaderStringLengthLimitsConstants.TITLE_MAX_DISPLAY_NON_USER_LENGTH );
			
			projectTitle += TRUNCATED_STRING_INDICATOR_APPENDED;
			
		}
		
		return projectTitle;
	}

}
