package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.ProjectListForProjectIdListSearcher.ProjectListForProjectIdListSearcher_ResultItem;

public interface ProjectListForProjectIdListSearcher_IF {

	List<ProjectListForProjectIdListSearcher_ResultItem> getProjectListForProjectIdList(List<Integer> projectIdList) throws SQLException;

}