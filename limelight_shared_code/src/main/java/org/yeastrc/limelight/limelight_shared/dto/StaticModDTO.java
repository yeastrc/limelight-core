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


import java.math.BigDecimal;

/**
 * table static_mod_tbl
 *
 */
public class StaticModDTO {
	
	private int id;
	private int searchId;
	private String residue;
	private BigDecimal mass;
	private String massString;
	
	@Override
	public String toString() {
		return "StaticModDTO [id=" + id + ", searchId=" + searchId + ", residue=" + residue + ", mass=" + mass
				+ ", massString=" + massString + "]";
	}
	
	public String getResidue() {
		return residue;
	}
	public void setResidue(String residue) {
		this.residue = residue;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public BigDecimal getMass() {
		return mass;
	}
	public void setMass(BigDecimal mass) {
		this.mass = mass;
	}
	public String getMassString() {
		return massString;
	}
	public void setMassString(String massString) {
		this.massString = massString;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}

}
