package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchWebLinksDTO;

public interface ProjectSearchWebLinks_WebDAO_IF {

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	Integer getProjectSearchIdFromId( int id ) throws SQLException;
	
	/**
	 * @param item
	 */
	void save( ProjectSearchWebLinksDTO item );
	
	/**
	 * Copy records from projectSearchId with new projectSearchId
	 * 
	 * @param oldProjectSearchId
	 * @param newProjectSearchId
	 */

	void duplicateRecordsForProjectSearchIdWithNewProjectSearchId(int oldProjectSearchId, int newProjectSearchId);

	/**
	 * @param id
	 */
	void delete( int id );
}