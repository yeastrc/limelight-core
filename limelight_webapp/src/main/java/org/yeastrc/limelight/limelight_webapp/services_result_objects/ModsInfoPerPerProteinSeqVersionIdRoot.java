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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 
 *
 */
public class ModsInfoPerPerProteinSeqVersionIdRoot {

	/**
	 * 
	 * Map<reported_peptide_id, Map<Mod Mass, PerModMassEntry>
	 */
	private Map<Integer, Map<Double,PerModMassEntry>> reportedPeptides;
	
	/**
	 * 
	 *
	 */
	public static class PerModMassEntry {
		
		/**
		 * Positions of Mod Mass in Reported Peptide
		 */
		private List<Integer> positions = new ArrayList<>();
		
		/**
		 * Map<Protein Seq Version Id>,[Mod Positions On Protein]>
		 */
		private Map<Integer,Set<Integer>> proteins = new HashMap<>();
		
		public void addToModMassReportedPeptidePositions( Integer position ) {
			positions.add( position );
		}

		/**
		 * Positions of Mod Mass in Reported Peptide
		 * @return
		 */
		public List<Integer> getPositions() {
			return positions;
		}

		/**
		 * Positions of Mod Mass in Reported Peptide
		 * @param positions
		 */
		public void setPositions(List<Integer> positions) {
			this.positions = positions;
		}

		/**
		 * Map<Protein Seq Version Id>,[Mod Positions On Protein]>
		 * @return
		 */
		public Map<Integer, Set<Integer>> getProteins() {
			return proteins;
		}

		/**
		 * Map<Protein Seq Version Id>,[Mod Positions On Protein]>
		 * @param proteins
		 */
		public void setProteins(Map<Integer, Set<Integer>> proteins) {
			this.proteins = proteins;
		}

	}

	/**
	 * Map<reported_peptide_id, Map<Mod Mass, PerModMassEntry>
	 * @return
	 */
	public Map<Integer, Map<Double, PerModMassEntry>> getReportedPeptides() {
		return reportedPeptides;
	}

	/**
	 * Map<reported_peptide_id, Map<Mod Mass, PerModMassEntry>
	 * @param reportedPeptides
	 */
	public void setReportedPeptides(Map<Integer, Map<Double, PerModMassEntry>> reportedPeptides) {
		this.reportedPeptides = reportedPeptides;
	}
}
