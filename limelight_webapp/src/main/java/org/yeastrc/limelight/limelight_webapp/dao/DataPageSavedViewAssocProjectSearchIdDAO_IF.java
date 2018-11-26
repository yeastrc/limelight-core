package org.yeastrc.limelight.limelight_webapp.dao;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewAssocProjectSearchIdDTO;

public interface DataPageSavedViewAssocProjectSearchIdDAO_IF {

	/**
	 * @param item
	 */
	void save(DataPageSavedViewAssocProjectSearchIdDTO item);

}