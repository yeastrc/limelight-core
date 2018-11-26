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
package org.yeastrc.limelight.limelight_importer.dto;

import org.yeastrc.limelight.limelight_importer.constants.DatabaseAutoIncIdFieldForRecordNotInsertedYetConstants;

/**
 * table protein_sequence_tbl
 *
 * equals(...) based on sequence
 */
public class ProteinSequenceDTO {
	

	private int id = DatabaseAutoIncIdFieldForRecordNotInsertedYetConstants.DB_AUTO_INC_FIELD_INITIAL_VALUE_FOR_NOT_INSERTED_YET;
	private String sequence;

	/**
	 * Constructor
	 */
	public ProteinSequenceDTO() { }
	
	/**
	 * Constructor
	 * 
	 * @param sequence
	 */
	public ProteinSequenceDTO( String sequence ) {
		
		this.sequence = sequence;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((sequence == null) ? 0 : sequence.hashCode());
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
		ProteinSequenceDTO other = (ProteinSequenceDTO) obj;
		if (sequence == null) {
			if (other.sequence != null)
				return false;
		} else if (!sequence.equals(other.sequence))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ProteinSequenceDTO [id=" + id + ", sequence=" + sequence + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSequence() {
		return sequence;
	}
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	
}
