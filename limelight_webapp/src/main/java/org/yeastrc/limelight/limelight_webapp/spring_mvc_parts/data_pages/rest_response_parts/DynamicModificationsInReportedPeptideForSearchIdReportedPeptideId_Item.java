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

import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;

/**
 * Entry per Search Id, Reported Peptide Id
 *
 */
public class DynamicModificationsInReportedPeptideForSearchIdReportedPeptideId_Item {
	
	private int reportedPeptideId;
	private int position;
	private double mass;
	
	public DynamicModificationsInReportedPeptideForSearchIdReportedPeptideId_Item() {}
		
	public DynamicModificationsInReportedPeptideForSearchIdReportedPeptideId_Item( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item item ) {
		this.position = item.getPosition();
		this.mass = item.getMass();
	}
	
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}

	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}

	public double getMass() {
		return mass;
	}

	public void setMass(double mass) {
		this.mass = mass;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}
}
