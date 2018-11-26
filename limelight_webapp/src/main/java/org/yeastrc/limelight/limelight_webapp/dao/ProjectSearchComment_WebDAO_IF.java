package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchCommentDTO;

public interface ProjectSearchComment_WebDAO_IF {

	 /**
	  * Get the project_search_id from the record from the database
	  * 
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	Integer getProjectSearchIdFromId( int id ) throws SQLException;
	
	/**
	 * Get the created_user_id from the record from the database
	 * 
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	Integer getCreatedUserIdFromId( int id ) throws SQLException;
	 
	/**
	 * @param item
	 */
	void save( ProjectSearchCommentDTO item );
	
	/**
	 * @param item
	 */
	void updatecommentText( ProjectSearchCommentDTO item );
	
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