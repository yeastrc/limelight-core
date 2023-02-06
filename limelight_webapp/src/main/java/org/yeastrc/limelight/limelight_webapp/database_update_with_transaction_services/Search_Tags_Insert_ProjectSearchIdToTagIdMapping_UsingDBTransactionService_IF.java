package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

public interface Search_Tags_Insert_ProjectSearchIdToTagIdMapping_UsingDBTransactionService_IF {

	/**
	 * @param projectSearchId
	 */

	void insert_ProjectSearchIds_TO_TagId_Mapping(

			List<Integer> projectSearchIds, int tagId);

}