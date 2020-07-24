/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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

/**
 * An Entry in the Set of PsmOpenModification_UniquePositions for a Reported Peptide
 * 
 * !!!!  MUST update hashCode and equals if add properties that need to be added to those methods
 *
 */
public class PsmOpenModification_UniquePosition_InReportedPeptide_Entry implements Comparable<PsmOpenModification_UniquePosition_InReportedPeptide_Entry> {

	private int position;
	private boolean is_N_Terminal;
	private boolean is_C_Terminal;
	
	//  !!!!  MUST update hashCode and equals if add properties that need to be added to those methods

	/* (non-Javadoc)
	 * @see java.lang.Comparable#compareTo(java.lang.Object)
	 */
	@Override
	public int compareTo(PsmOpenModification_UniquePosition_InReportedPeptide_Entry otherObject ) {
		if ( this.equals(otherObject) )
			return 0;
		if ( this.position < otherObject.position )
			return -1;
		if ( this.position > otherObject.position )
			return 1;
		return 0; //  Not sure how to order is N and is C 
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (is_C_Terminal ? 1231 : 1237);
		result = prime * result + (is_N_Terminal ? 1231 : 1237);
		result = prime * result + position;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PsmOpenModification_UniquePosition_InReportedPeptide_Entry other = (PsmOpenModification_UniquePosition_InReportedPeptide_Entry) obj;
		if (is_C_Terminal != other.is_C_Terminal)
			return false;
		if (is_N_Terminal != other.is_N_Terminal)
			return false;
		if (position != other.position)
			return false;
		return true;
	}

	
	public int getPosition() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}
	public boolean isIs_N_Terminal() {
		return is_N_Terminal;
	}
	public void setIs_N_Terminal(boolean is_N_Terminal) {
		this.is_N_Terminal = is_N_Terminal;
	}
	public boolean isIs_C_Terminal() {
		return is_C_Terminal;
	}
	public void setIs_C_Terminal(boolean is_C_Terminal) {
		this.is_C_Terminal = is_C_Terminal;
	}
	
}
