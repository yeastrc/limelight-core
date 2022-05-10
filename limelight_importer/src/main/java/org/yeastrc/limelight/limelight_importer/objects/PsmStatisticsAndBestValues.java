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
	
	private int psmNum_Targets_Only_AtDefaultCutoff;
	private int psmNum_IndependentDecoys_Only_AtDefaultCutoff;
	private int psmNum_Decoys_Only_AtDefaultCutoff;
	
	private BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets;
	private BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys;
	private BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys;
	
	private Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> psmOpenModification_UniquePositions;
	private Set<Integer> psmOpenModification_UniqueMassesRounded;
	private long firstSavedPsmId_Is_Target = 0;
	private long firstSavedPsmId_Is_IndependentDecoy = 0;
	private long firstSavedPsmId_Is_Decoy = 0;
	private long lastSavedPsmId = 0;
	
	public Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> getPsmOpenModification_UniquePositions() {
		return psmOpenModification_UniquePositions;
	}

	public void setPsmOpenModification_UniquePositions(Set<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> psmOpenModification_UniquePositions) {
		this.psmOpenModification_UniquePositions = psmOpenModification_UniquePositions;
	}

	public long getFirstSavedPsmId_Is_Target() {
		return firstSavedPsmId_Is_Target;
	}

	public void setFirstSavedPsmId_Is_Target(long firstSavedPsmId_Is_Target) {
		this.firstSavedPsmId_Is_Target = firstSavedPsmId_Is_Target;
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

	public long getFirstSavedPsmId_Is_IndependentDecoy() {
		return firstSavedPsmId_Is_IndependentDecoy;
	}

	public void setFirstSavedPsmId_Is_IndependentDecoy(long firstSavedPsmId_Is_IndependentDecoy) {
		this.firstSavedPsmId_Is_IndependentDecoy = firstSavedPsmId_Is_IndependentDecoy;
	}

	public long getFirstSavedPsmId_Is_Decoy() {
		return firstSavedPsmId_Is_Decoy;
	}

	public void setFirstSavedPsmId_Is_Decoy(long firstSavedPsmId_Is_Decoy) {
		this.firstSavedPsmId_Is_Decoy = firstSavedPsmId_Is_Decoy;
	}

	public int getPsmNum_Targets_Only_AtDefaultCutoff() {
		return psmNum_Targets_Only_AtDefaultCutoff;
	}

	public void setPsmNum_Targets_Only_AtDefaultCutoff(int psmNum_Targets_Only_AtDefaultCutoff) {
		this.psmNum_Targets_Only_AtDefaultCutoff = psmNum_Targets_Only_AtDefaultCutoff;
	}

	public int getPsmNum_IndependentDecoys_Only_AtDefaultCutoff() {
		return psmNum_IndependentDecoys_Only_AtDefaultCutoff;
	}

	public void setPsmNum_IndependentDecoys_Only_AtDefaultCutoff(int psmNum_IndependentDecoys_Only_AtDefaultCutoff) {
		this.psmNum_IndependentDecoys_Only_AtDefaultCutoff = psmNum_IndependentDecoys_Only_AtDefaultCutoff;
	}

	public int getPsmNum_Decoys_Only_AtDefaultCutoff() {
		return psmNum_Decoys_Only_AtDefaultCutoff;
	}

	public void setPsmNum_Decoys_Only_AtDefaultCutoff(int psmNum_Decoys_Only_AtDefaultCutoff) {
		this.psmNum_Decoys_Only_AtDefaultCutoff = psmNum_Decoys_Only_AtDefaultCutoff;
	}

	public BestPsmFilterableAnnotationProcessing getBestPsmFilterableAnnotationProcessing_PSM_Targets() {
		return bestPsmFilterableAnnotationProcessing_PSM_Targets;
	}

	public void setBestPsmFilterableAnnotationProcessing_PSM_Targets(
			BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets) {
		this.bestPsmFilterableAnnotationProcessing_PSM_Targets = bestPsmFilterableAnnotationProcessing_PSM_Targets;
	}

	public BestPsmFilterableAnnotationProcessing getBestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys() {
		return bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys;
	}

	public void setBestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys(
			BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys) {
		this.bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys = bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys;
	}

	public BestPsmFilterableAnnotationProcessing getBestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys() {
		return bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys;
	}

	public void setBestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys(
			BestPsmFilterableAnnotationProcessing bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys) {
		this.bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys = bestPsmFilterableAnnotationProcessing_PSM_Targets_IndependentDecoys_Decoys;
	}
}
