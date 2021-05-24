package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.List;
import java.util.Set;

public interface MoveProjectSearchIdToNewProjectUsingDBTransactionServiceIF {

	/**
	 * @param item
	 * @param projectUserDTO
	 */

	void moveProjectSearchIdsToNewProjectId(List<Integer> projectSearchIdList, int newProjectId, Set<Integer> experimentIds_Containing_ProjectSearchId);

}