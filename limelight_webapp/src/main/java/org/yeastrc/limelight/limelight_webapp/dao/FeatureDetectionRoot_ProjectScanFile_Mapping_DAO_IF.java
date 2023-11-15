package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionRoot_ProjectScanFile_Mapping_DTO;

public interface FeatureDetectionRoot_ProjectScanFile_Mapping_DAO_IF {
	
	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	FeatureDetectionRoot_ProjectScanFile_Mapping_DTO getForId( int id ) throws SQLException;

	//  Spring DB Transactions
	/**
	 * @param displayLabel
	 * @param description
	 * @param id
	 * @param userId
	 */
	void update_DisplayLabel_Description( String displayLabel, String description, int id, int userId ); 

	/**
	 * @param id
	 * @throws Exception
	 */
	void delete(int id);

}