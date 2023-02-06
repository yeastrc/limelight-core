package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.CopyProjectSearchIdToNewProjectUsingDBTransactionService.Log_DuplicateKeyException;

public interface CopyProjectSearchIdToNewProjectUsingDBTransactionServiceIF {

	/**
	 * @param log_DuplicateKeyException TODO
	 * @param item
	 * @param projectUserDTO
	 */

	void copyProjectSearchIdsToNewProjectId(List<Integer> projectSearchIdList, int newProjectId, boolean copyAnyAssociatedTags, int creatingUserId, Log_DuplicateKeyException log_DuplicateKeyException);

}