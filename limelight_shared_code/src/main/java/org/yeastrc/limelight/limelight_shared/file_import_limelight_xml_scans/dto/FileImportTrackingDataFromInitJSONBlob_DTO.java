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
 * table  file_import_tracking_data_from_init_json_blob_tbl
 * 
 * !!  NOT Populated when OLD Submit Import program is used !!
 *
 */
public class FileImportTrackingDataFromInitJSONBlob_DTO {

	private int fileImportTrackingId;
	
	private int jsonContents_FormatVersion;
	
	private String jsonContents;
	
	@Override
	public String toString() {
		return "FileImportTrackingDataJSONBlob_DTO [fileImportTrackingId=" + fileImportTrackingId
				+ ", jsonContents_FormatVersion=" + jsonContents_FormatVersion + ", jsonContents=" + jsonContents + "]";
	}

	public int getFileImportTrackingId() {
		return fileImportTrackingId;
	}

	public void setFileImportTrackingId(int fileImportTrackingId) {
		this.fileImportTrackingId = fileImportTrackingId;
	}

	public int getJsonContents_FormatVersion() {
		return jsonContents_FormatVersion;
	}

	public void setJsonContents_FormatVersion(int jsonContents_FormatVersion) {
		this.jsonContents_FormatVersion = jsonContents_FormatVersion;
	}

	public String getJsonContents() {
		return jsonContents;
	}

	public void setJsonContents(String jsonContents) {
		this.jsonContents = jsonContents;
	}

}
