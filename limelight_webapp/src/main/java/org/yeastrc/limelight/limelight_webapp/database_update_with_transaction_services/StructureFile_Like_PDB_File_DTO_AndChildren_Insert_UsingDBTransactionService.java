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
package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.StructureFile_Like_PDB_File_DTO;
import org.yeastrc.limelight.limelight_shared.dto_json_blobs_in_db.StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT;
import org.yeastrc.limelight.limelight_shared.dto_json_blobs_in_db.StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT.StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_Entry;
import org.yeastrc.limelight.limelight_webapp.dao.StructureFile_Like_PDB_File_ChainEntry_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.StructureFile_Like_PDB_File_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.StructureFile_Like_PDB_File_DAO.SkipLogInsertException;

/**
 * Insert structure_file_like_pdb_tbl and children records
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService implements StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService_IF {

	private static final Logger log = LoggerFactory.getLogger( StructureFile_Like_PDB_File_DTO_AndChildren_Insert_UsingDBTransactionService.class );

	@Autowired
	private StructureFile_Like_PDB_File_DAO_IF structureFile_Like_PDB_File_DAO;
	
	@Autowired
	private StructureFile_Like_PDB_File_ChainEntry_DAO_IF structureFile_Like_PDB_File_ChainEntry_DAO;
	
	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 * @param projectSearchIdList
	 */
	
	@Override
	//  Spring DB Transactions
	
	@Transactional( rollbackFor = Exception.class, propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void structureFile_Like_PDB_File_DTO_AndChildren_Insert( StructureFile_Like_PDB_File_DTO structureFile_Like_PDB_File_DTO, StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT ) { //  No 'Throws' allowed due to 
		try {

			structureFile_Like_PDB_File_DAO.saveToDatabase( structureFile_Like_PDB_File_DTO, SkipLogInsertException.NO );
						
			for ( StructureFile_Chains_Id_Label_Auth_Json_Blob_InDB_Entry entry : structureFile_Chains_Id_Label_Auth_Json_Blob_InDB_ROOT.getEntries() ) {
				
				structureFile_Like_PDB_File_ChainEntry_DAO.saveToDatabase(
						structureFile_Like_PDB_File_DTO.getId(),
						entry.getLid()
						);
			}
									
		} catch ( RuntimeException e ) {
			String msg = "fail structureFile_Like_PDB_File_DTO_AndChildren_Insert(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail structureFile_Like_PDB_File_DTO_AndChildren_Insert(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}
}
