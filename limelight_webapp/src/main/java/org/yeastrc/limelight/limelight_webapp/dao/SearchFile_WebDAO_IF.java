package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.SearchFileDTO;

public interface SearchFile_WebDAO_IF {

	SearchFileDTO getSearchFileDTOForId(int id) throws SQLException;

	/**
	 * Get the file_contents for the id
	 * @param id
	 * @return null if record not found for id
	 * @throws Exception
	 */
	byte[] getDataFileData(int id) throws Exception;

}