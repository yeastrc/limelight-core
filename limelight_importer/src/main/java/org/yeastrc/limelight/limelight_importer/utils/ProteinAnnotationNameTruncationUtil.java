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
package org.yeastrc.limelight.limelight_importer.utils;

import org.yeastrc.limelight.limelight_importer.constants.FASTA_DataTruncationConstants;

/**
 * Truncate the name property in protein annotation to value in FASTA_DataTruncationConstants
 *
 */
public class ProteinAnnotationNameTruncationUtil {

	/**
	 * Truncate header name, if needed
	 * 
	 * @param headerName
	 * @return
	 */
	public static String truncateProteinAnnotationName( String headerName ) {
		
		
		//  Truncate header name, if needed
		
		if ( headerName != null ) {
			
			if ( headerName.length() > FASTA_DataTruncationConstants.HEADER_NAME_MAX_LENGTH ) {
				
				headerName = headerName.substring( 0, FASTA_DataTruncationConstants.HEADER_NAME_MAX_LENGTH );
			}

		}
		
		return headerName;
	}

}