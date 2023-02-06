package org.yeastrc.limelight.limelight_webapp.dao;

import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagStringInProject_DTO;

public interface ProjectSearch_TagStringInProject_DAO_IF {

	/**
	 * Return the id
	 * @param tagCategoryId TODO
	 * 
	 * @param 
	 * @return null if not found
	 */

	//  Needs to be transactional to work properly with Transactions since this method is called after the 'save' method below

	Integer getId_For_ProjectId_TagCategoryId_TagString(int projectId, int tagCategoryId, String tagString);
	
	/**
	 * @param tagId
	 * @return null if not found
	 * 
	 */
	Integer getProjectId_For_Id( int tagId );

	/**
	 * NOT SET 'id' property on param Project_ScanFile_DTO
	 * 
	 * @param item
	 */

	void save__NOT_SET_ID(ProjectSearch_TagStringInProject_DTO item);
	
	/**
	 * @param item
	 */
	void update( ProjectSearch_TagStringInProject_DTO item );
	
	/**
	 * @param tagId
	 */
	void delete( int tagId );

}