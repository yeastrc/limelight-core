package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;

public interface ProjectScanFilename_For_ProjectScanFileId_Set_Searcher_IF {

	/**
	 * @param projectScanFileId_Set
	 * @return
	 * @throws SQLException
	 */

	List<Project_ScanFilename_DTO> get_For_ProjectScanFileId_Set_Searcher(Set<Integer> projectScanFileId_Set)
			throws SQLException;

}