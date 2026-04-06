package org.yeastrc.limelight.limelight_webapp.dao;

import org.yeastrc.limelight.limelight_shared.dto.StructureFile_Like_PDB_File_DTO;
import org.yeastrc.limelight.limelight_webapp.dao.StructureFile_Like_PDB_File_DAO.SkipLogInsertException;
import org.yeastrc.limelight.limelight_webapp.dao.StructureFile_Like_PDB_File_DAO.StructureFile_Like_PDB_File_DAO__Get_project_id_AND_file_object_storage_main_entry_id_fk_ForId;

public interface StructureFile_Like_PDB_File_DAO_IF {

	/**
	 * @param id
	 * @throws Exception
	 */
	Integer get_ProjectId_ForId( int id ) throws Exception;
	
	/**
	 * @param id
	 * @throws Exception
	 */
	StructureFile_Like_PDB_File_DTO getForId(int id) throws Exception;
	
	/**
	 * @param id
	 * @throws Exception
	 */
	StructureFile_Like_PDB_File_DAO__Get_project_id_AND_file_object_storage_main_entry_id_fk_ForId get_project_id_AND_file_object_storage_main_entry_id_fk_ForId( int id ) throws Exception;

	/**
	 * @param item
	 * @throws Exception
	 */
	void saveToDatabase(StructureFile_Like_PDB_File_DTO item, SkipLogInsertException skipLogInsertException);
	
	/**
	 * 
	 * @param description
	 * @param id
	 */
	void updateDescription( String description, int id ); 
	 
	/**
	 * @param id
	 * @throws Exception
	 */
	void delete( int id ) throws Exception;


}
