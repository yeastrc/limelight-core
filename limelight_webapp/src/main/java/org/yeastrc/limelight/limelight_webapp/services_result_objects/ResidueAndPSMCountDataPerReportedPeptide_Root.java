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
package org.yeastrc.limelight.limelight_webapp.services_result_objects;

import java.util.List;
import java.util.Map;

/**
 * Result from ResidueAndPSMCountDataPerReportedPeptide_For_SearchID_SearchCriteriaService
 *
 */
public class ResidueAndPSMCountDataPerReportedPeptide_Root {

	/**
	 * <Reported Peptide Id, PerReportedPeptideEntry>
	 */
	Map<Integer,PerReportedPeptideEntry> reportedPeptideData;
	
	public static class PerReportedPeptideEntry {
		
		private int peptideLength;
		private int psmCount;

		/**
		 *  <residue, residue count in peptide>
		 */
		private Map<String, Integer> perResidueCounts;
		
		/**
		 * 
		 */
		private Map<Integer, List<Integer>> proteinSequenceVersionIdsPeptidePositions;

		/**
		 * <residue, residue count in peptide>
		 * @return
		 */
		public Map<String, Integer> getPerResidueCounts() {
			return perResidueCounts;
		}

		/**
		 * <residue, residue count in peptide>
		 * @param perResidueCounts
		 */
		public void setPerResidueCounts(Map<String, Integer> perResidueCounts) {
			this.perResidueCounts = perResidueCounts;
		}

		public int getPsmCount() {
			return psmCount;
		}
		public void setPsmCount(int psmCount) {
			this.psmCount = psmCount;
		}

		public int getPeptideLength() {
			return peptideLength;
		}

		public void setPeptideLength(int peptideLength) {
			this.peptideLength = peptideLength;
		}

		public Map<Integer, List<Integer>> getProteinSequenceVersionIdsPeptidePositions() {
			return proteinSequenceVersionIdsPeptidePositions;
		}

		public void setProteinSequenceVersionIdsPeptidePositions(
				Map<Integer, List<Integer>> proteinSequenceVersionIdsPeptidePositions) {
			this.proteinSequenceVersionIdsPeptidePositions = proteinSequenceVersionIdsPeptidePositions;
		}
	}
	

	public Map<Integer, PerReportedPeptideEntry> getReportedPeptideData() {
		return reportedPeptideData;
	}

	public void setReportedPeptideData(Map<Integer, PerReportedPeptideEntry> reportedPeptideData) {
		this.reportedPeptideData = reportedPeptideData;
	}


}
