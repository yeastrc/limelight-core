package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;

public interface ProjectScanFile_For_ProjectScanFileId_Set_Searcher_IF {

	/**
	 * @param projectScanFileId_Set
	 * @return
	 * @throws SQLException
	 */

	List<Project_ScanFile_DTO> get_For_ProjectScanFileId_Set_Searcher(Set<Integer> projectScanFileId_Set)
			throws SQLException;

}