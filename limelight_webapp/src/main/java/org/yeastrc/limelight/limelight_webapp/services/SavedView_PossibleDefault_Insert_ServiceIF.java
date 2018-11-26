package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewAssocProjectSearchIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewDTO;

public interface SavedView_PossibleDefault_Insert_ServiceIF {

	/**
	 * @param item
	 * @param children
	 */
	void addDataPageSavedView_UpdateDefaultIfSet(DataPageSavedViewDTO item,
			List<DataPageSavedViewAssocProjectSearchIdDTO> children) throws SQLException;

}