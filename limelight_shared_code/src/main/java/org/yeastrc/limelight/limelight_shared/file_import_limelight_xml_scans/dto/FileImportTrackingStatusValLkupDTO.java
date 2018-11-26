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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto;

/**
 * table file_import_tracking_status_values_lookup_tbl
 *
 */
public class FileImportTrackingStatusValLkupDTO {

	private int id;
	private String statusDisplayText;
	
	@Override
	public String toString() {
		return "FileImportTrackingStatusValLkupDTO [id=" + id + ", statusDisplayText=" + statusDisplayText + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStatusDisplayText() {
		return statusDisplayText;
	}
	public void setStatusDisplayText(String statusDisplayText) {
		this.statusDisplayText = statusDisplayText;
	}
	
}
