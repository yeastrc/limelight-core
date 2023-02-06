package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;

public interface ProjectScanFilename_DAO_IF {

	/**
	 * Return the id
	 * 
	 * @param 
	 * @return null if not found
	 * @throws SQLException
	 */

	Integer getId_For_ProjectScanFileId_ScanFilename(int projectScanFileId, String scanFilename) throws SQLException;
	
	/**
	 * @param projectScanFileId
	 * @return
	 * @throws SQLException
	 */
	List<String> getScanFilenameList_For_ProjectScanFileId( int projectScanFileId ) throws SQLException;

	/**
	 * NOT SET 'id' property on param Project_ScanFile_DTO
	 * 
	 * @param item
	 * @param log_DuplicateKeyException TODO
	 */

	void save__NOT_SET_ID(Project_ScanFilename_DTO item, ProjectScanFilename_DAO.Log_DuplicateKeyException log_DuplicateKeyException);

	/**
	 * @param id
	 */

	void delete(int id);

}