package org.yeastrc.limelight.limelight_webapp.dao;

public interface StructureFile_Like_PDB_File_ChainEntry_DAO_IF {

	/**
	 * @param structure_file_like_pdb_id_fk
	 * @param limelight_chain_id
	 * @throws Exception
	 */
	void saveToDatabase(int structure_file_like_pdb_id_fk, int limelight_chain_id);

}