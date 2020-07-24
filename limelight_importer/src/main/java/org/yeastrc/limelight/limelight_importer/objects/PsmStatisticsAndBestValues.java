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
package org.yeastrc.limelight.limelight_importer.objects;

import java.util.Set;

import org.yeastrc.limelight.limelight_importer.process_input.BestPsmFilterableAnnotationProcessing;

/**
 * From processing PSMs for Single Reported Peptide
 *
 */
public class PsmStatisticsAndBestValues {
	
	private int psmCountPassDefaultCutoffs = 0;
	private BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing;
	private Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> psmOpenModification_UniquePositions;
	private Set<Integer> psmOpenModification_UniqueMassesRounded;
	private long firstSavedPsmId = 0;
	private long lastSavedPsmId = 0;
	
	public int getPsmCountPassDefaultCutoffs() {
		return psmCountPassDefaultCutoffs;
	}

	public void setPsmCountPassDefaultCutoffs(int psmCountPassDefaultCutoffs) {
		this.psmCountPassDefaultCutoffs = psmCountPassDefaultCutoffs;
	}

	public BestPsmFilterableAnnotationProcessing getBestPsmFilterableAnnotationProcessing() {
		return bestPsmFilterableAnnotationProcessing;
	}

	public void setBestPsmFilterableAnnotationProcessing(
			BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing) {
		this.bestPsmFilterableAnnotationProcessing = bestPsmFilterableAnnotationProcessing;
	}

	public Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> getPsmOpenModification_UniquePositions() {
		return psmOpenModification_UniquePositions;
	}

	public void setPsmOpenModification_UniquePositions(Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> psmOpenModification_UniquePositions) {
		this.psmOpenModification_UniquePositions = psmOpenModification_UniquePositions;
	}

	public long getFirstSavedPsmId() {
		return firstSavedPsmId;
	}

	public void setFirstSavedPsmId(long firstSavedPsmId) {
		this.firstSavedPsmId = firstSavedPsmId;
	}

	public long getLastSavedPsmId() {
		return lastSavedPsmId;
	}

	public void setLastSavedPsmId(long lastSavedPsmId) {
		this.lastSavedPsmId = lastSavedPsmId;
	}

	public Set<Integer> getPsmOpenModification_UniqueMassesRounded() {
		return psmOpenModification_UniqueMassesRounded;
	}

	public void setPsmOpenModification_UniqueMassesRounded(Set<Integer> psmOpenModification_UniqueMassesRounded) {
		this.psmOpenModification_UniqueMassesRounded = psmOpenModification_UniqueMassesRounded;
	}
}
