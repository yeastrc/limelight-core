package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result;

public interface ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_IF {

	ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result get_ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId(
			int projectSearchId) throws SQLException;

}