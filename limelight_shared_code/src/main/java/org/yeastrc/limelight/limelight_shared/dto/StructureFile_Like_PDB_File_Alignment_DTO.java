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

import java.sql.Date;

/**
 * table structure_file_like_pdb_alignment_tbl
 *
 */
public class StructureFile_Like_PDB_File_Alignment_DTO {

	/**
	 * Parent id
	 */
	private int structureFile_Like_PDB_File_Id;
	
	private int projectId;
	private int proteinSequenceVersionId;
	
	private int limelightAssigned_ChainId;
	
	private String aligned_StructureFile_Sequence;
	private String aligned_Limelight_Protein_Sequence;
	
	private String searchIds_WhenAlignmentCreated_CommaDelimited;
	
	private Date created_DateTime;
	private int userId_Created;
	
	private Date updated_DateTime;
	private int userId_Updated;
	
	@Override
	public String toString() {
		return "StructureFile_Like_PDB_File_Alignment_DTO [structureFile_Like_PDB_File_Id="
				+ structureFile_Like_PDB_File_Id + ", projectId=" + projectId + ", proteinSequenceVersionId="
				+ proteinSequenceVersionId + ", limelightAssigned_ChainId=" + limelightAssigned_ChainId + ", aligned_StructureFile_Sequence="
				+ aligned_StructureFile_Sequence + ", aligned_Limelight_Protein_Sequence="
				+ aligned_Limelight_Protein_Sequence + ", searchIds_WhenAlignmentCreated_CommaDelimited="
				+ searchIds_WhenAlignmentCreated_CommaDelimited + ", created_DateTime=" + created_DateTime
				+ ", userId_Created=" + userId_Created + ", updated_DateTime=" + updated_DateTime + ", userId_Updated="
				+ userId_Updated + "]";
	}

	public int getStructureFile_Like_PDB_File_Id() {
		return structureFile_Like_PDB_File_Id;
	}
	public void setStructureFile_Like_PDB_File_Id(int structureFile_Like_PDB_File_Id) {
		this.structureFile_Like_PDB_File_Id = structureFile_Like_PDB_File_Id;
	}
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public int getProteinSequenceVersionId() {
		return proteinSequenceVersionId;
	}
	public void setProteinSequenceVersionId(int proteinSequenceVersionId) {
		this.proteinSequenceVersionId = proteinSequenceVersionId;
	}
	public String getAligned_StructureFile_Sequence() {
		return aligned_StructureFile_Sequence;
	}
	public void setAligned_StructureFile_Sequence(String aligned_StructureFile_Sequence) {
		this.aligned_StructureFile_Sequence = aligned_StructureFile_Sequence;
	}
	public String getAligned_Limelight_Protein_Sequence() {
		return aligned_Limelight_Protein_Sequence;
	}
	public void setAligned_Limelight_Protein_Sequence(String aligned_Limelight_Protein_Sequence) {
		this.aligned_Limelight_Protein_Sequence = aligned_Limelight_Protein_Sequence;
	}
	public Date getCreated_DateTime() {
		return created_DateTime;
	}
	public void setCreated_DateTime(Date created_DateTime) {
		this.created_DateTime = created_DateTime;
	}
	public int getUserId_Created() {
		return userId_Created;
	}
	public void setUserId_Created(int userId_Created) {
		this.userId_Created = userId_Created;
	}
	public Date getUpdated_DateTime() {
		return updated_DateTime;
	}
	public void setUpdated_DateTime(Date updated_DateTime) {
		this.updated_DateTime = updated_DateTime;
	}
	public int getUserId_Updated() {
		return userId_Updated;
	}
	public void setUserId_Updated(int userId_Updated) {
		this.userId_Updated = userId_Updated;
	}
	public String getSearchIds_WhenAlignmentCreated_CommaDelimited() {
		return searchIds_WhenAlignmentCreated_CommaDelimited;
	}
	public void setSearchIds_WhenAlignmentCreated_CommaDelimited(String searchIds_WhenAlignmentCreated_CommaDelimited) {
		this.searchIds_WhenAlignmentCreated_CommaDelimited = searchIds_WhenAlignmentCreated_CommaDelimited;
	}

	public int getLimelightAssigned_ChainId() {
		return limelightAssigned_ChainId;
	}

	public void setLimelightAssigned_ChainId(int limelightAssigned_ChainId) {
		this.limelightAssigned_ChainId = limelightAssigned_ChainId;
	}
			
}