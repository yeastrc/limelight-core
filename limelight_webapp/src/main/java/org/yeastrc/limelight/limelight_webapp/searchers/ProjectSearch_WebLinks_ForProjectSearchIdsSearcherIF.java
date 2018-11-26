package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchWebLinksDTO;

public interface ProjectSearch_WebLinks_ForProjectSearchIdsSearcherIF {

	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException
	 */
	List<ProjectSearchWebLinksDTO> getProjectSearchWebLinksDTO_ForProjectSearchIds(List<Integer> projectSearchIds)
			throws SQLException;

}