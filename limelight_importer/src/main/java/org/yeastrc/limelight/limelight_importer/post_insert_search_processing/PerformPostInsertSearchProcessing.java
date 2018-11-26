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
package org.yeastrc.limelight.limelight_importer.post_insert_search_processing;

import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.objects.ReportedPeptideAndPsmFilterableAnnotationTypesOnId;

/**
 * Perform Processing done after the search is inserted
 *
 */
public class PerformPostInsertSearchProcessing {
	/**
	 * private constructor
	 */
	private PerformPostInsertSearchProcessing(){}
	public static PerformPostInsertSearchProcessing getInstance() {
		return new PerformPostInsertSearchProcessing();
	}

	/**
	 * @param searchId
	 * @throws Exception 
	 */
	public void performPostInsertSearchProcessing( 
			SearchDTO_Importer search,
			ReportedPeptideAndPsmFilterableAnnotationTypesOnId reportedPeptideAndPsmFilterableAnnotationTypesOnId ) throws Exception {
		
		UpdateLookupTablesPostInsertSearch.getInstance()
		.updateLookupTablesPostInsertSearch( search, reportedPeptideAndPsmFilterableAnnotationTypesOnId );
		
	}
}
