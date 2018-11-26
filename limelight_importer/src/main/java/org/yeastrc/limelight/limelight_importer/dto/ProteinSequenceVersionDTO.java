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
 * table protein_sequence_version_tbl
 *
 */
public class ProteinSequenceVersionDTO {
	

	private int id = DatabaseAutoIncIdFieldForRecordNotInsertedYetConstants.DB_AUTO_INC_FIELD_INITIAL_VALUE_FOR_NOT_INSERTED_YET;
	private int proteinSequenceId;
	private int isotopeLabelId;
	
	@Override
	public String toString() {
		return "ProteinSequenceVersionDTO [id=" + id + ", proteinSequenceId=" + proteinSequenceId + ", isotopeLabelId="
				+ isotopeLabelId + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProteinSequenceId() {
		return proteinSequenceId;
	}
	public void setProteinSequenceId(int proteinSequenceId) {
		this.proteinSequenceId = proteinSequenceId;
	}
	public int getIsotopeLabelId() {
		return isotopeLabelId;
	}
	public void setIsotopeLabelId(int isotopeLabelId) {
		this.isotopeLabelId = isotopeLabelId;
	}

	
}
