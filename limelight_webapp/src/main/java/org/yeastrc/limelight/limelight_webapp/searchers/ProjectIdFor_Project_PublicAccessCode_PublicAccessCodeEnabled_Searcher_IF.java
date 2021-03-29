package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;

public interface ProjectIdFor_Project_PublicAccessCode_PublicAccessCodeEnabled_Searcher_IF {

	/**
	 * @param projectPublicAccessCode
	 * @return
	 * @throws SQLException
	 */
	Integer getProjectId_Project_PublicAccessCode_PublicAccessCodeEnabled(String projectPublicAccessCode)
			throws SQLException;

}