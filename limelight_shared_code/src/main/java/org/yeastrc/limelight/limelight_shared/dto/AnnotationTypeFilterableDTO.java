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

import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;

/**
 * table annotation_type_filterable
 *
 */
public class AnnotationTypeFilterableDTO {

	private int annotationTypeId;

	/**
	 * enum FilterDirectionType
	 */
	private FilterDirectionTypeJavaCodeEnum filterDirectionTypeJavaCodeEnum;

	private boolean defaultFilter;
	private Double defaultFilterValue;
	private String defaultFilterValueString;

	private boolean defaultFilterAtDatabaseLoad;
	private Double defaultFilterValueAtDatabaseLoad;
	private String defaultFilterValueStringAtDatabaseLoad;

	private Integer sortOrder;

	public int getAnnotationTypeId() {
		return annotationTypeId;
	}

	public void setAnnotationTypeId(int annotationTypeId) {
		this.annotationTypeId = annotationTypeId;
	}

	public boolean isDefaultFilter() {
		return defaultFilter;
	}

	public void setDefaultFilter(boolean defaultFilter) {
		this.defaultFilter = defaultFilter;
	}

	public Double getDefaultFilterValue() {
		return defaultFilterValue;
	}

	public void setDefaultFilterValue(Double defaultFilterValue) {
		this.defaultFilterValue = defaultFilterValue;
	}

	public String getDefaultFilterValueString() {
		return defaultFilterValueString;
	}

	public void setDefaultFilterValueString(String defaultFilterValueString) {
		this.defaultFilterValueString = defaultFilterValueString;
	}

	public boolean isDefaultFilterAtDatabaseLoad() {
		return defaultFilterAtDatabaseLoad;
	}

	public void setDefaultFilterAtDatabaseLoad(boolean defaultFilterAtDatabaseLoad) {
		this.defaultFilterAtDatabaseLoad = defaultFilterAtDatabaseLoad;
	}

	public Double getDefaultFilterValueAtDatabaseLoad() {
		return defaultFilterValueAtDatabaseLoad;
	}

	public void setDefaultFilterValueAtDatabaseLoad(Double defaultFilterValueAtDatabaseLoad) {
		this.defaultFilterValueAtDatabaseLoad = defaultFilterValueAtDatabaseLoad;
	}

	public String getDefaultFilterValueStringAtDatabaseLoad() {
		return defaultFilterValueStringAtDatabaseLoad;
	}

	public void setDefaultFilterValueStringAtDatabaseLoad(String defaultFilterValueStringAtDatabaseLoad) {
		this.defaultFilterValueStringAtDatabaseLoad = defaultFilterValueStringAtDatabaseLoad;
	}

	public Integer getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public FilterDirectionTypeJavaCodeEnum getFilterDirectionTypeJavaCodeEnum() {
		return filterDirectionTypeJavaCodeEnum;
	}

	public void setFilterDirectionTypeJavaCodeEnum(FilterDirectionTypeJavaCodeEnum filterDirectionTypeJavaCodeEnum) {
		this.filterDirectionTypeJavaCodeEnum = filterDirectionTypeJavaCodeEnum;
	}

}
