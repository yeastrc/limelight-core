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
package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table unified_rep_pep_dynamic_mod_lookup_tbl
 *
 */
public class UnifiedRepPepDynamicModLookupDTO {

	private int id;
	private int unifiedReportedPeptideLookupId;
	private int position;
	private double mass;
	private double massRounded;
	private String massRoundedString;
	private int massRoundingPlaces;
	private int modOrder;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUnifiedReportedPeptideLookupId() {
		return unifiedReportedPeptideLookupId;
	}
	public void setUnifiedReportedPeptideLookupId(int unifiedReportedPeptideLookupId) {
		this.unifiedReportedPeptideLookupId = unifiedReportedPeptideLookupId;
	}
	public int getPosition() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}
	public double getMass() {
		return mass;
	}
	public void setMass(double mass) {
		this.mass = mass;
	}
	public double getMassRounded() {
		return massRounded;
	}
	public void setMassRounded(double massRounded) {
		this.massRounded = massRounded;
	}
	public String getMassRoundedString() {
		return massRoundedString;
	}
	public void setMassRoundedString(String massRoundedString) {
		this.massRoundedString = massRoundedString;
	}
	public int getMassRoundingPlaces() {
		return massRoundingPlaces;
	}
	public void setMassRoundingPlaces(int massRoundingPlaces) {
		this.massRoundingPlaces = massRoundingPlaces;
	}
	public int getModOrder() {
		return modOrder;
	}
	public void setModOrder(int modOrder) {
		this.modOrder = modOrder;
	}
}
