package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

public interface SearchDisplayOrder_InFolder_Update_UsingDBTransactionService_IF {

	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 * @param projectSearchIdList
	 */

	void searchDisplayOrder_Update(int folderId, List<Integer> projectSearchIdList);

}