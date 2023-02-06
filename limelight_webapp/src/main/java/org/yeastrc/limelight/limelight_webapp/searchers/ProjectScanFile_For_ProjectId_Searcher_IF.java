package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectId_Searcher.ProjectScanFile_For_ProjectId_Searcher_ResultItem;


public interface ProjectScanFile_For_ProjectId_Searcher_IF {

	List<ProjectScanFile_For_ProjectId_Searcher_ResultItem> getProjectScanFile_For_ProjectId(int projectId) throws SQLException;

}