package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import org.yeastrc.limelight.limelight_shared.dto.StructureFile_Like_PDB_File_DTO;
import org.yeastrc.limelight.limelight_shared.dto_json_blobs_in_db.StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT;

public interface StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService_IF {

	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 * @param projectSearchIdList
	 */

	void structureFile_Like_PDB_File_DTO_AndChildren_Insert(
			StructureFile_Like_PDB_File_DTO structureFile_Like_PDB_File_DTO,
			StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT);

}