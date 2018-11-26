package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.SearchFileProjectSearchDTO;

public interface SearchFileProjectSearch_WebDAO_IF {

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	SearchFileProjectSearchDTO getSearchFileProjectSearchDTOForId( int id ) throws SQLException;

	/**
	 * @param id
	 * @param displayFilename
	 */
	void updateDisplayFilename( int id, String displayFilename );
	
	/**
	 * Copy records from projectSearchId with new projectSearchId
	 * 
	 * @param oldProjectSearchId
	 * @param newProjectSearchId
	 */
	void duplicateRecordsForProjectSearchIdWithNewProjectSearchId(int oldProjectSearchId, int newProjectSearchId);

}