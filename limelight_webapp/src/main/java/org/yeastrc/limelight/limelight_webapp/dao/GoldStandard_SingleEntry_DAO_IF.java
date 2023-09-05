package org.yeastrc.limelight.limelight_webapp.dao;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_SingleEntry_DTO;

public interface GoldStandard_SingleEntry_DAO_IF {

	/**
	 * @param item
	 */

	void save(GoldStandard_SingleEntry_DTO item);

}