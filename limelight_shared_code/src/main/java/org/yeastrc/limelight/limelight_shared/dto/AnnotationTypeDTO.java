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

import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;

/**
 * table annotation_type_tbl
 *
 */
public class AnnotationTypeDTO {

	private int id;
	private int searchId;
	private int searchProgramsPerSearchId;
	
	private PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType;
	private FilterableDescriptiveAnnotationType filterableDescriptiveAnnotationType;
	
	private String name;

	private boolean defaultVisible;
	private Integer displayOrder;

	private String description;
	
	
	private AnnotationTypeFilterableDTO annotationTypeFilterableDTO;
	
	
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
	public int getSearchProgramsPerSearchId() {
		return searchProgramsPerSearchId;
	}
	public void setSearchProgramsPerSearchId(int searchProgramsPerSearchId) {
		this.searchProgramsPerSearchId = searchProgramsPerSearchId;
	}
	public PsmPeptideMatchedProteinAnnotationType getPsmPeptideMatchedProteinAnnotationType() {
		return psmPeptideMatchedProteinAnnotationType;
	}
	public void setPsmPeptideMatchedProteinAnnotationType(PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType) {
		this.psmPeptideMatchedProteinAnnotationType = psmPeptideMatchedProteinAnnotationType;
	}
	public FilterableDescriptiveAnnotationType getFilterableDescriptiveAnnotationType() {
		return filterableDescriptiveAnnotationType;
	}
	public void setFilterableDescriptiveAnnotationType(
			FilterableDescriptiveAnnotationType filterableDescriptiveAnnotationType) {
		this.filterableDescriptiveAnnotationType = filterableDescriptiveAnnotationType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isDefaultVisible() {
		return defaultVisible;
	}
	public void setDefaultVisible(boolean defaultVisible) {
		this.defaultVisible = defaultVisible;
	}
	public Integer getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public AnnotationTypeFilterableDTO getAnnotationTypeFilterableDTO() {
		return annotationTypeFilterableDTO;
	}
	public void setAnnotationTypeFilterableDTO(AnnotationTypeFilterableDTO annotationTypeFilterableDTO) {
		this.annotationTypeFilterableDTO = annotationTypeFilterableDTO;
	}
	
}
