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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_response_parts;

/**
 * Webservice response from ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RestWebserviceController
 *
 */
public class ReportedPeptideItemForReportedPeptideIdList_SingleProjectSearchId {

	private int reportedPeptideId;
	
	//  These are null if not computed or in DB, if null, requires separate webservice call to get them
	private Integer numPsms_IfComputedOrInDB;
//	private Integer numUniquePsms_IfComputedOrInDB;

	public int getReportedPeptideId() {
		return reportedPeptideId;
	}

	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}

	public Integer getNumPsms_IfComputedOrInDB() {
		return numPsms_IfComputedOrInDB;
	}

	public void setNumPsms_IfComputedOrInDB(Integer numPsms_IfComputedOrInDB) {
		this.numPsms_IfComputedOrInDB = numPsms_IfComputedOrInDB;
	}
		
}
