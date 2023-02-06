package org.yeastrc.limelight.limelight_webapp.searchers;

import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher.FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_Result;

public interface FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_IF {

	/**
	 * @param searchId
	 * @return
	 * @throws Exception
	 */
	FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_Result getForProjectSearchId(int searchId) throws Exception;

}