package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.services.Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service.IsAssistantProjectOwnerAllowed;
import org.yeastrc.limelight.limelight_webapp.services.Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service.IsProjectOwnerAllowed;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_ProjectPage_PerProjectSearchId_Result;

public interface Get_SearchDetails_ProjectPage_For_ProjectSearchIds_ServiceIF {

	/**
	 * @param projectSearchIds
	 * @param isProjectOwnerAllowed
	 * @param userId
	 * @return
	 * @throws SQLException
	 */
	SearchDetails_ProjectPage_PerProjectSearchId_Result get_SearchDetails_ProjectPage_For_ProjectSearchIds(

			List<Integer> projectSearchIds, IsProjectOwnerAllowed isProjectOwnerAllowed, IsAssistantProjectOwnerAllowed isAssistantProjectOwnerAllowed, Integer userId)
			throws SQLException;

}