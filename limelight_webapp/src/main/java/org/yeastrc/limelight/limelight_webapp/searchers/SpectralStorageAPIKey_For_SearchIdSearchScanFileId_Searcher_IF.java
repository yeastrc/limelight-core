package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface SpectralStorageAPIKey_For_SearchIdSearchScanFileId_Searcher_IF {

	/**
	 * @param searchId
	 * @param searchScanFileId
	 * @return = null if not found
	 * @throws SQLException
	 */
	String get_SpectralStorageAPIKey_For_SearchId_SearchScanFileId(int searchId, int searchScanFileId)
			throws SQLException;

}