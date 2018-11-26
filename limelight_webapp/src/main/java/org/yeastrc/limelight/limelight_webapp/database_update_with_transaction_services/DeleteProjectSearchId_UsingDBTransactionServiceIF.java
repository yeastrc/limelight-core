package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

public interface DeleteProjectSearchId_UsingDBTransactionServiceIF {

	/**
	 * @param projectSearchId
	 */
	void deleteProjectSearchId(int projectSearchId);

}