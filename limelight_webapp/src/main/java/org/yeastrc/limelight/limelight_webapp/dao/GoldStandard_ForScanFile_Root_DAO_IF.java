package org.yeastrc.limelight.limelight_webapp.dao;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_ForScanFile_Root_DTO;

public interface GoldStandard_ForScanFile_Root_DAO_IF {

	/**
	 * @param item
	 */

	void save(GoldStandard_ForScanFile_Root_DTO item);

	/**
	 * @param id
	 * @param userId
	 */
	void set_True_EntryFullyInserted(int id, int userId);

	/**
	 * @param id
	 * @throws Exception
	 */

	void delete(int id);

}