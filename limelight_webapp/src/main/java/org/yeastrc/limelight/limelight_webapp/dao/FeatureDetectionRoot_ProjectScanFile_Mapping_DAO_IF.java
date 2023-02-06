package org.yeastrc.limelight.limelight_webapp.dao;

public interface FeatureDetectionRoot_ProjectScanFile_Mapping_DAO_IF {

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