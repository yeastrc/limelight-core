package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers_results.ProjectToCopyToResultItem;

public interface ProjectToCopyToSearcherIF {

//	/**
//	 * @param projectId
//	 * @return
//	 * @throws Exception
//	 */
//	boolean anyProjectsExistExcludingProjectId(int projectId) throws Exception;

	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	List<ProjectToCopyToResultItem> getAllExcludingProjectId(int projectId) throws Exception;

//	/**
//	 * @param authUserId
//	 * @param maxAuthLevel
//	 * @param projectId
//	 * @return
//	 * @throws Exception
//	 */
//	boolean anyProjectsExistForAuthUserExcludingProjectId(int authUserId, int maxAuthLevel, int projectId)
//			throws Exception;

	/**
	 * @param authUserId
	 * @param maxAuthLevel
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	List<ProjectToCopyToResultItem> getForAuthUserExcludingProjectId(int authUserId, int maxAuthLevel, int projectId)
			throws Exception;

}