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
 * table  file_import_tracking_single_file_s3_upload_part_tbl
 * 
 */
public class FileImportTrackingSingleFile_S3UploadPart_DTO {

	//  Primary Key:
	
	private int fileImportTrackingSingleFileId;
	private int s3_UploadPart_Number;
	
	//  Rest

	private long s3_UploadPart_StartByte_ZeroBased;
	private long s3_UploadPart_EndByte_ZeroBased;
	
	private String s3_UploadPart_Etag;

	@Override
	public String toString() {
		return "FileImportTrackingSingleFile_S3UploadPart_DTO [fileImportTrackingSingleFileId="
				+ fileImportTrackingSingleFileId + ", s3_UploadPart_Number=" + s3_UploadPart_Number
				+ ", s3_UploadPart_StartByte_ZeroBased=" + s3_UploadPart_StartByte_ZeroBased
				+ ", s3_UploadPart_EndByte_ZeroBased=" + s3_UploadPart_EndByte_ZeroBased + ", s3_UploadPart_Etag="
				+ s3_UploadPart_Etag + "]";
	}

	public int getFileImportTrackingSingleFileId() {
		return fileImportTrackingSingleFileId;
	}

	public void setFileImportTrackingSingleFileId(int fileImportTrackingSingleFileId) {
		this.fileImportTrackingSingleFileId = fileImportTrackingSingleFileId;
	}

	public int getS3_UploadPart_Number() {
		return s3_UploadPart_Number;
	}

	public void setS3_UploadPart_Number(int s3_UploadPart_Number) {
		this.s3_UploadPart_Number = s3_UploadPart_Number;
	}

	public long getS3_UploadPart_StartByte_ZeroBased() {
		return s3_UploadPart_StartByte_ZeroBased;
	}

	public void setS3_UploadPart_StartByte_ZeroBased(long s3_UploadPart_StartByte_ZeroBased) {
		this.s3_UploadPart_StartByte_ZeroBased = s3_UploadPart_StartByte_ZeroBased;
	}

	public long getS3_UploadPart_EndByte_ZeroBased() {
		return s3_UploadPart_EndByte_ZeroBased;
	}

	public void setS3_UploadPart_EndByte_ZeroBased(long s3_UploadPart_EndByte_ZeroBased) {
		this.s3_UploadPart_EndByte_ZeroBased = s3_UploadPart_EndByte_ZeroBased;
	}

	public String getS3_UploadPart_Etag() {
		return s3_UploadPart_Etag;
	}

	public void setS3_UploadPart_Etag(String s3_UploadPart_Etag) {
		this.s3_UploadPart_Etag = s3_UploadPart_Etag;
	}
}
