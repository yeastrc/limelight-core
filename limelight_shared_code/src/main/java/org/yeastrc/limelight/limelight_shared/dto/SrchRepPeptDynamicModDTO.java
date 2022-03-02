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
 * table srch_rep_pept__dynamic_mod_tbl
 *
 */
public class SrchRepPeptDynamicModDTO {

	private int id;
	private int searchId;
	private int reportedPeptideId;
	private int position;
	private double mass;
	private boolean is_N_Terminal;
	private boolean is_C_Terminal;
	private String peptideResidueLetter;
	private String proteinResidueLetterIfAllSame; // null if values not all same  


	@Override
	public String toString() {
		return "SrchRepPeptDynamicModDTO [id=" + id + ", searchId=" + searchId + ", reportedPeptideId="
				+ reportedPeptideId + ", position=" + position + ", mass=" + mass + ", is_N_Terminal=" + is_N_Terminal
				+ ", is_C_Terminal=" + is_C_Terminal + ", peptideResidueLetter=" + peptideResidueLetter
				+ ", proteinResidueLetterIfAllSame=" + proteinResidueLetterIfAllSame + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
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
	public boolean isIs_N_Terminal() {
		return is_N_Terminal;
	}
	public void setIs_N_Terminal(boolean is_N_Terminal) {
		this.is_N_Terminal = is_N_Terminal;
	}
	public boolean isIs_C_Terminal() {
		return is_C_Terminal;
	}
	public void setIs_C_Terminal(boolean is_C_Terminal) {
		this.is_C_Terminal = is_C_Terminal;
	}
	public String getPeptideResidueLetter() {
		return peptideResidueLetter;
	}
	public void setPeptideResidueLetter(String peptideResidueLetter) {
		this.peptideResidueLetter = peptideResidueLetter;
	}
	public String getProteinResidueLetterIfAllSame() {
		return proteinResidueLetterIfAllSame;
	}
	public void setProteinResidueLetterIfAllSame(String proteinResidueLetterIfAllSame) {
		this.proteinResidueLetterIfAllSame = proteinResidueLetterIfAllSame;
	}
}
