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

import java.util.Map;

import org.yeastrc.limelight.limelight_webapp.objects.AnnotationDataItem_ForPage;

/**
 * Part of response from PSM_List_RestWebserviceController
 *
 */
public class PSM_Item_ForPSM_List {

	private long psmId;
	private int charge;
	private int scanNumber;
	private String scanFilename;
	private int searchId;

	private Float retentionTimeSeconds;
	private Double precursor_M_Over_Z;
	
	private Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap;
	
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
	public String getScanFilename() {
		return scanFilename;
	}
	public void setScanFilename(String scanFilename) {
		this.scanFilename = scanFilename;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public Map<Integer, AnnotationDataItem_ForPage> getPsmAnnotationMap() {
		return psmAnnotationMap;
	}
	public void setPsmAnnotationMap(Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap) {
		this.psmAnnotationMap = psmAnnotationMap;
	}
	public Float getRetentionTimeSeconds() {
		return retentionTimeSeconds;
	}
	public void setRetentionTimeSeconds(Float retentionTimeSeconds) {
		this.retentionTimeSeconds = retentionTimeSeconds;
	}
	public Double getPrecursor_M_Over_Z() {
		return precursor_M_Over_Z;
	}
	public void setPrecursor_M_Over_Z(Double precursor_M_Over_Z) {
		this.precursor_M_Over_Z = precursor_M_Over_Z;
	}
	

}
