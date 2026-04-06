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
 * table structure_file_like_pdb_file_type_lookup_tbl
 *
 */
public class StructureFile_Like_PDB_File_FileTypeLookup_DTO {

	private int id;
	
	/**
	 * passed to from web front end
	 */
	private String shortName;
	private String description;

	@Override
	public String toString() {
		return "StructureFile_Like_PDB_File_FileTypeLookup_DTO [id=" + id + ", shortName=" + shortName
				+ ", description=" + description + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * passed to from web front end
	 */
	public String getShortName() {
		return shortName;
	}

	/**
	 * passed to from web front end
	 */
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
}