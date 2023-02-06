package org.yeastrc.limelight.limelight_webapp.dao;


import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;

public interface ProjectScanFileDAO_IF {
	
	/**
	 * @param id
	 * @return null if id not found
	 * @throws SQLException
	 */
	Project_ScanFile_DTO getById( int id ) throws SQLException;

	/**
	 * Return the numeric fields for id
	 * 
	 * @param id
	 * @return null if not found
	 * @throws SQLException
	 */

	Integer getId_For_ProjectId_ScanFileId(int projectId, int scanFileId);

	/**
	 * NOT SET 'id' property on param Project_ScanFile_DTO
	 * 
	 * @param item
	 * @param log_DuplicateKeyException TODO
	 */

	void save__NOT_SET_ID(Project_ScanFile_DTO item, ProjectScanFileDAO.Log_DuplicateKeyException log_DuplicateKeyException);

	/**
	 * @param id
	 */

	void delete(int id);

}