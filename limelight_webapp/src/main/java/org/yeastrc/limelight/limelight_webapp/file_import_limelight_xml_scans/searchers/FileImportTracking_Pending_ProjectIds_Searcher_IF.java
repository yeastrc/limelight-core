package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers;

import java.util.List;

public interface FileImportTracking_Pending_ProjectIds_Searcher_IF {

	/**
	 * @return
	 * @throws Exception
	 */
	List<Integer> getPending_ProjectIds() throws Exception;

}