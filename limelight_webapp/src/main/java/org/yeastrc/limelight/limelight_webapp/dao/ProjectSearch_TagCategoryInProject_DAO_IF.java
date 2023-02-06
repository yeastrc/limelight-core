package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagCategoryInProject_DTO;

public interface ProjectSearch_TagCategoryInProject_DAO_IF {

	/**
	 * Return the record for the id
	 * 
	 * @param 
	 * @return null if not found
	 */
	public ProjectSearch_TagCategoryInProject_DTO getRecord_For_Id( int id );
		
	/**
	 * Return the id
	 * 
	 * @param 
	 * @return null if not found
	 * @throws SQLException
	 */

	//  Needs to be transactional to work properly with Transactions since this method is called after the 'save' method below

	Integer getId_For_ProjectId_CategoryLabel(int projectId, String categoryLabel);

	/**
	 * Return the Project Id
	 * 
	 * @param 
	 * @return null if not found
	 */

	//  Needs to be transactional to work properly with Transactions since this method is called after the 'save' method below

	Integer getProjectId_For_Id(int tagId);

	/**
	 * Return the id
	 * 
	 * @param 
	 * @return null if not found
	 * @throws SQLException
	 */

	//  Needs to be transactional to work properly with Transactions since this method is called after the 'save' method below

	Integer getId_For_UncategorizedFakeRecord();

	/**
	 * NOT SET 'id' property on param ProjectSearch_TagCategoryInProject_DTO
	 * 
	 * @param item
	 */

	void save__NOT_SET_ID(ProjectSearch_TagCategoryInProject_DTO item);

	/**
	 * @param item
	 */

	void insertIfNotExist_UncategorizedFakeRecord();

	/**
	 * 
	 * 
	 * @param item
	 */

	void update(ProjectSearch_TagCategoryInProject_DTO item);

	/**
	 * 
	 * 
	 * @param id
	 */

	void delete(int id);

}