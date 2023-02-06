package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.Set;

public interface DeleteProjectSearchId_UsingDBTransactionServiceIF {

	/**
	 * @param projectSearchIds
	 * @param experimentIds_Containing_ProjectSearchId TODO
	 */
	void deleteProjectSearchIds(Set<Integer> projectSearchIds, Set<Integer> experimentIds_Containing_ProjectSearchId);

}