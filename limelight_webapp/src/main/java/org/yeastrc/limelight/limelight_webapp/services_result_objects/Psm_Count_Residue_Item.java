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
package org.yeastrc.limelight.limelight_webapp.services_result_objects;

import java.util.ArrayList;
import java.util.List;

/**
 * Result from Psm_Count_For_Residues_For_SearchID_SearchCriteriaService
 *
 */
public class Psm_Count_Residue_Item {

	private List<Integer> reportedPeptides = new ArrayList<>();
	private int totalInstances;
	
	public void addReportedPeptide( int reportedPeptide ) {
		reportedPeptides.add( reportedPeptide );
	}
	
	public void addPSMCount_To_totalInstances( int psmCount ) {
		totalInstances += psmCount;
	}
	
	public int getTotalInstances() {
		return totalInstances;
	}
	public void setTotalInstances(int totalInstances) {
		this.totalInstances = totalInstances;
	}
	public List<Integer> getReportedPeptides() {
		return reportedPeptides;
	}
	public void setReportedPeptides(List<Integer> reportedPeptides) {
		this.reportedPeptides = reportedPeptides;
	}
}
