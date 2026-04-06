package org.yeastrc.limelight.limelight_webapp.dao;

import org.yeastrc.limelight.limelight_shared.dto.StructureFile_Like_PDB_File_Alignment_DTO;
import org.yeastrc.limelight.limelight_webapp.dao.StructureFile_Like_PDB_File_Alignment_DAO.SkipLogInsertException;

public interface StructureFile_Like_PDB_File_Alignment_DAO_IF {

//	/**
//	 * @param id
//	 * @throws Exception
//	 */
//
//	StructureFile_Like_PDB_File_Alignment_DTO getForId(int id) throws Exception;
//	
//	
//	/**
//	 * @param id
//	 * @return structure_file_like_pdb_id_fk or null
//	 * @throws Exception
//	 */
//	Integer get_structure_file_like_pdb_id_fk_ForId_InDB( int id ) throws Exception;
//	
//	/**
//	 * @param protein_sequence_version_id
//	 * @param structure_file_like_pdb_id_fk
//	 * @param chain_id
//	 * @return
//	 * @throws Exception
//	 */
//	Integer get_ID_For_UniqueKey__protein_sequence_version_id__structure_file_like_pdb_id_fk__chain_id(
//
//			int protein_sequence_version_id,
//			int structure_file_like_pdb_id_fk,
//			String chain_id
//
//			) throws Exception;

	/**
	 * @param item
	 * @throws Exception
	 */

	void saveOrUpdate(StructureFile_Like_PDB_File_Alignment_DTO item, SkipLogInsertException skipLogInsertException)
			throws Exception;

//	/**
//	 * @param item
//	 * @throws Exception
//	 */
//
//	void update(StructureFile_Like_PDB_File_Alignment_DTO item)
//			throws Exception;

	/**
	 * @param structureFile_Like_PDB_File_Id
	 * @param limelightAssigned_ChainId
	 * @param proteinSequenceVersionId
	 * @throws Exception
	 */
	void delete( 	
			/**
			 * Parent id
			 */
			int structureFile_Like_PDB_File_Id,

			/**
			 * Structure File Limelight Assigned Chain Id
			 */
			int limelightAssigned_ChainId,

			int proteinSequenceVersionId
			) throws Exception;
}