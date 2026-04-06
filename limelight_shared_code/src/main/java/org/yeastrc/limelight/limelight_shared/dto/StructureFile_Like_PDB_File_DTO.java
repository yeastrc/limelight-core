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

import org.yeastrc.limelight.limelight_shared.enum_classes.StructureFile_Like_PDB_File_FileType_Enum;

/**
 * table structure_file_like_pdb_tbl
 *
 */
public class StructureFile_Like_PDB_File_DTO {

	private int id;
	
	private int projectId;
	private int fileObjectStorage_MainEntryId;
	
	private StructureFile_Like_PDB_File_FileType_Enum fileType_Enum;
	
	/**
	 * Most likely Filename
	 */
	private String name;
	
	private long fileSize;
	
	private String description;
	
	private String structureFile_Chains_Id_Label_Auth_Json_Blob;
	
	private Date created_DateTime;
	private int userId_Created;
	
	
	@Override
	public String toString() {
		return "StructureFile_Like_PDB_File_DTO [id=" + id + ", projectId=" + projectId
				+ ", fileObjectStorage_MainEntryId=" + fileObjectStorage_MainEntryId + ", fileType_Enum="
				+ fileType_Enum + ", name=" + name + ", fileSize=" + fileSize + ", description=" + description
				+ ", structureFile_Chains_Id_Label_Auth_Json_Blob=" + structureFile_Chains_Id_Label_Auth_Json_Blob
				+ ", created_DateTime=" + created_DateTime + ", userId_Created=" + userId_Created + "]";
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public int getFileObjectStorage_MainEntryId() {
		return fileObjectStorage_MainEntryId;
	}
	public void setFileObjectStorage_MainEntryId(int fileObjectStorage_MainEntryId) {
		this.fileObjectStorage_MainEntryId = fileObjectStorage_MainEntryId;
	}
	public StructureFile_Like_PDB_File_FileType_Enum getFileType_Enum() {
		return fileType_Enum;
	}
	public void setFileType_Enum(StructureFile_Like_PDB_File_FileType_Enum fileType_Enum) {
		this.fileType_Enum = fileType_Enum;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getFileSize() {
		return fileSize;
	}
	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStructureFile_Chains_Id_Label_Auth_Json_Blob() {
		return structureFile_Chains_Id_Label_Auth_Json_Blob;
	}
	public void setStructureFile_Chains_Id_Label_Auth_Json_Blob(String structureFile_Chains_Id_Label_Auth_Json_Blob) {
		this.structureFile_Chains_Id_Label_Auth_Json_Blob = structureFile_Chains_Id_Label_Auth_Json_Blob;
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
	
	
			
}