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
 * Protein Page 
 *
 */
public class ProteinItemForProteinList_SingleProjectSearchId {

	private int searchId;
	
	//  These are null if not computed
	private Integer numPsms;
//	private Integer numUniquePsms;
	
	private String proteinName;
	
	//	These are null if not retrieved.   Key for both is Annotation Type Id
	private Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap;
	private Map<Integer, AnnotationDataItem_ForPage> peptideAnnotationMap;
	
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public Integer getNumPsms() {
		return numPsms;
	}
	public void setNumPsms(Integer numPsms) {
		this.numPsms = numPsms;
	}
	public Map<Integer, AnnotationDataItem_ForPage> getPsmAnnotationMap() {
		return psmAnnotationMap;
	}
	public void setPsmAnnotationMap(Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap) {
		this.psmAnnotationMap = psmAnnotationMap;
	}
	public Map<Integer, AnnotationDataItem_ForPage> getPeptideAnnotationMap() {
		return peptideAnnotationMap;
	}
	public void setPeptideAnnotationMap(Map<Integer, AnnotationDataItem_ForPage> peptideAnnotationMap) {
		this.peptideAnnotationMap = peptideAnnotationMap;
	}
	public String getProteinName() {
		return proteinName;
	}
	public void setProteinName(String proteinName) {
		this.proteinName = proteinName;
	}
	
}
