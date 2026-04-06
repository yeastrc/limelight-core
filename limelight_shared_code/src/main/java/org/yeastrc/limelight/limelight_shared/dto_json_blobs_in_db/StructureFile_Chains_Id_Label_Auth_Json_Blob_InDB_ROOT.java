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
package org.yeastrc.limelight.limelight_shared.dto_json_blobs_in_db;

import java.util.List;

/**
 * table 	structure_file_like_pdb_tbl
 * 
 * Field  	structure_file_chains_id_label_auth_json_blob
 * 
 * JSON generated in front end
 *
 */
public class StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT {

	private List<StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_Entry> entries;
	

	/**
	 * table 	structure_file_like_pdb_tbl
	 * 
	 * Field  	structure_file_chains_id_label_auth_json_blob
	 * 
	 * Entry in array - Single Chain in the structure file
	 * 
	 * Short property names to keep JSON short
	 *
	 */
	public static class StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_Entry {
		
		/**
		 * Limelight assigned id for this chain
		 */
		private int lid;
		
		/**
		 * Label assigned at structure file creation.  Often is 'A','B', but can be different
		 */
		private String lbl;
		/**
		 * Author assigned label.
		 */
		private String aal;
		
		/**
		 * Limelight assigned id for this chain
		 */
		public int getLid() {
			return lid;
		}
		/**
		 * Limelight assigned id for this chain
		 */
		public void setLid(int lid) {
			this.lid = lid;
		}

		/**
		 * Label assigned at structure file creation.  Often is 'A','B', but can be different
		 */
		public String getLbl() {
			return lbl;
		}

		/**
		 * Label assigned at structure file creation.  Often is 'A','B', but can be different
		 */
		public void setLbl(String lbl) {
			this.lbl = lbl;
		}
		/**
		 * Author assigned label.
		 */
		public String getAal() {
			return aal;
		}
		/**
		 * Author assigned label.
		 */
		public void setAal(String aal) {
			this.aal = aal;
		}
	}


	public List<StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_Entry> getEntries() {
		return entries;
	}
	public void setEntries(List<StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_Entry> entries) {
		this.entries = entries;
	}
}
