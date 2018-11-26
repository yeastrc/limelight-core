package org.yeastrc.limelight.limelight_webapp.searchers;

public interface ProjectSearchIdAssocSearchIdInProjectIdSearcherIF {

	/**
	 * Is the SearchId associated with a ProjectSearchId in the ProjectId where project_search is not marked for deletion
	 * 
	 * @param projectSearchId
	 * @param projectId
	 * @return
	 * @throws Exception 
	 */
	boolean isSearchIdAssocWithProjectSearchIdInProjectId(int projectSearchId, int projectId) throws Exception;

}