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
 * search_details_tbl table
 */
public class SearchDetailsDTO {

	private int searchId;
	private int psmCount;
	private int reportedPeptideCount;
	private int matchedProteinCount;
	private long importElapsedTime_Milliseconds;
	private long importerReadLimelightXmlFileElapsedTime_Milliseconds;
	private long importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds;
	private long importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds;

	private long limelightXML_File__FileSize_Bytes;
	private Long scanFiles_TotalFilesSize_Bytes;

	@Override
	public String toString() {
		return "SearchDetailsDTO [searchId=" + searchId + ", psmCount=" + psmCount + ", reportedPeptideCount="
				+ reportedPeptideCount + ", matchedProteinCount=" + matchedProteinCount
				+ ", importElapsedTime_Milliseconds=" + importElapsedTime_Milliseconds
				+ ", importerReadLimelightXmlFileElapsedTime_Milliseconds="
				+ importerReadLimelightXmlFileElapsedTime_Milliseconds
				+ ", importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds="
				+ importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds
				+ ", importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds="
				+ importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds
				+ ", limelightXML_File__FileSize_Bytes=" + limelightXML_File__FileSize_Bytes
				+ ", scanFiles_TotalFilesSize_Bytes=" + scanFiles_TotalFilesSize_Bytes + "]";
	}
	
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public int getPsmCount() {
		return psmCount;
	}
	public void setPsmCount(int psmCount) {
		this.psmCount = psmCount;
	}
	public int getReportedPeptideCount() {
		return reportedPeptideCount;
	}
	public void setReportedPeptideCount(int reportedPeptideCount) {
		this.reportedPeptideCount = reportedPeptideCount;
	}
	public int getMatchedProteinCount() {
		return matchedProteinCount;
	}
	public void setMatchedProteinCount(int matchedProteinCount) {
		this.matchedProteinCount = matchedProteinCount;
	}
	public long getImportElapsedTime_Milliseconds() {
		return importElapsedTime_Milliseconds;
	}
	public void setImportElapsedTime_Milliseconds(long importElapsedTime_Milliseconds) {
		this.importElapsedTime_Milliseconds = importElapsedTime_Milliseconds;
	}
	public long getImporterReadLimelightXmlFileElapsedTime_Milliseconds() {
		return importerReadLimelightXmlFileElapsedTime_Milliseconds;
	}
	public void setImporterReadLimelightXmlFileElapsedTime_Milliseconds(
			long importerReadLimelightXmlFileElapsedTime_Milliseconds) {
		this.importerReadLimelightXmlFileElapsedTime_Milliseconds = importerReadLimelightXmlFileElapsedTime_Milliseconds;
	}
	public long getImporterProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds() {
		return importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds;
	}
	public void setImporterProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds(
			long importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds) {
		this.importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds = importerProteinsForPeptides_TotalProcessing_ElapsedTime_Milliseconds;
	}

	public long getImporter_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds() {
		return importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds;
	}

	public void setImporter_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds(
			long importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds) {
		this.importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds = importer_SearchInserted_WaitTime_For_Spectr_Complete_Milliseconds;
	}

	public long getLimelightXML_File__FileSize_Bytes() {
		return limelightXML_File__FileSize_Bytes;
	}

	public void setLimelightXML_File__FileSize_Bytes(long limelightXML_File__FileSize_Bytes) {
		this.limelightXML_File__FileSize_Bytes = limelightXML_File__FileSize_Bytes;
	}

	public Long getScanFiles_TotalFilesSize_Bytes() {
		return scanFiles_TotalFilesSize_Bytes;
	}

	public void setScanFiles_TotalFilesSize_Bytes(Long scanFiles_TotalFilesSize_Bytes) {
		this.scanFiles_TotalFilesSize_Bytes = scanFiles_TotalFilesSize_Bytes;
	}
}

