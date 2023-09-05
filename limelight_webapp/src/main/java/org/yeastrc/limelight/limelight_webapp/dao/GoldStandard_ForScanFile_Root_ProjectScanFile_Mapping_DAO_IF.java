package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO;

public interface GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO_IF {
	
	
	/**
	 * @param mappingId
	 * @return
	 * @throws SQLException
	 */
	Integer get_RootId_For_MappingId( int mappingId ) throws SQLException;
	
	/**
	 * @param item
	 */
	void save(GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO item);

	/**
	 * @param displayLabel
	 * @param description
	 * @param id
	 * @param userId
	 */
	void update_DisplayLabel_Description(String displayLabel, String description, int id, int userId);

	/**
	 * @param id
	 * @throws Exception
	 */
	void delete(int id);

}