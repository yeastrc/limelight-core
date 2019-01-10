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

import java.util.List;
import java.util.Map;

import org.yeastrc.limelight.limelight_webapp.dto_lorikeet.LorikeetVariableMod;
import org.yeastrc.limelight.limelight_webapp.objects.AnnotationDataItem_ForPage;

/**
 * Response item from PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController
 *
 */
public class PSM_Peptide_List_Display_With_SpectrumViewer_Item {

	private long psmId;

	private int charge;
	private int scanNumber;

	private Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap;
	
	private int reportedPeptideId;

	private String reportedPeptideString;
	private String peptideSequence;


	/**
	 * Variable Mods / Dynamic Mods
	 */
	private List<LorikeetVariableMod> variableMods; 

	private double ntermMod = 0; // additional mass to be added to the n-term
	private double ctermMod = 0; // additional mass to be added to the c-term
	
	private String label;		// stable isotope label name
	
	public long getPsmId() {
		return psmId;
	}
	public void setPsmId(long psmId) {
		this.psmId = psmId;
	}
	public int getCharge() {
		return charge;
	}
	public void setCharge(int charge) {
		this.charge = charge;
	}
	public int getScanNumber() {
		return scanNumber;
	}
	public void setScanNumber(int scanNumber) {
		this.scanNumber = scanNumber;
	}
	public Map<Integer, AnnotationDataItem_ForPage> getPsmAnnotationMap() {
		return psmAnnotationMap;
	}
	public void setPsmAnnotationMap(Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap) {
		this.psmAnnotationMap = psmAnnotationMap;
	}
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}
	public String getReportedPeptideString() {
		return reportedPeptideString;
	}
	public void setReportedPeptideString(String reportedPeptideString) {
		this.reportedPeptideString = reportedPeptideString;
	}
	public List<LorikeetVariableMod> getVariableMods() {
		return variableMods;
	}
	public void setVariableMods(List<LorikeetVariableMod> variableMods) {
		this.variableMods = variableMods;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getPeptideSequence() {
		return peptideSequence;
	}
	public void setPeptideSequence(String peptideSequence) {
		this.peptideSequence = peptideSequence;
	}
	public double getNtermMod() {
		return ntermMod;
	}
	public void setNtermMod(double ntermMod) {
		this.ntermMod = ntermMod;
	}
	public double getCtermMod() {
		return ctermMod;
	}
	public void setCtermMod(double ctermMod) {
		this.ctermMod = ctermMod;
	}
	
	
}
