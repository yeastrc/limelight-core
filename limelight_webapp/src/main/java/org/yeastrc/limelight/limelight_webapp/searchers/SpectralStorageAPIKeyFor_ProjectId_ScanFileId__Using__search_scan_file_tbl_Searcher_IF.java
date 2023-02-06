package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__search_scan_file_tbl_Searcher.SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__search_scan_file_tbl_Searcher_Result;

public interface SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__search_scan_file_tbl_Searcher_IF {

	/**
	 * @param projectId
	 * @param scanFileId
	 * @return
	 * @throws SQLException
	 */
	SpectralStorageAPIKeyFor_ProjectId_ScanFileId__Using__search_scan_file_tbl_Searcher_Result get_SpectralStorageAPIKey_For_ProjectId_ScanFileId__Using__search_scan_file_tbl(
			int projectId, int scanFileId) throws SQLException;

}