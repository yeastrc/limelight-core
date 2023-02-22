package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_ForSearch_ForSearchIdsSearcher.FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_ForSearch_ForSearchIdsSearcher.FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item;

public interface FileObjectStorage_ForSearch_ForSearchIdsSearcher_IF {

	/**
	 * @param searchIds
	 * @return
	 * @throws SQLException
	 */
	List<FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item> getFileObjectStorage_ForSearch_ForSearchIds(
			FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams requestParams) throws SQLException;

}