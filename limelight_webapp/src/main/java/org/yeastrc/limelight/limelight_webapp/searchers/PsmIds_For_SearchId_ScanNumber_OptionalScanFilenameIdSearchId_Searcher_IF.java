package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

public interface PsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher_IF {


	/**
	 * @param searchId
	 * @param scanNumber
	 * @param searchScanFileId
	 * @return
	 * @throws Exception
	 */
	List<Long> getPsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher(int searchId, int scanNumber,
			Integer searchScanFileId) throws Exception;

}