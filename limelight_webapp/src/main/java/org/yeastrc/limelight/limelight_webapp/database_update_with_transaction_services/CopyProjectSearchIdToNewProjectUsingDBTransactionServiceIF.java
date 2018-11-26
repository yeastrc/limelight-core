package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

public interface CopyProjectSearchIdToNewProjectUsingDBTransactionServiceIF {

	/**
	 * @param item
	 * @param projectUserDTO
	 */

	void copyProjectSearchIdsToNewProjectId(List<Integer> projectSearchIdList, int newProjectId, int creatingUserId);

}