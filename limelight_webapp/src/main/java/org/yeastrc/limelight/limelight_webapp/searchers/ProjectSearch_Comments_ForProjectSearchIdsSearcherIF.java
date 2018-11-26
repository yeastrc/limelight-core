package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchCommentDTO;

public interface ProjectSearch_Comments_ForProjectSearchIdsSearcherIF {

	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException
	 */
	List<ProjectSearchCommentDTO> getProjectSearchCommentDTO_ForProjectSearchIds(List<Integer> projectSearchIds)
			throws SQLException;

}