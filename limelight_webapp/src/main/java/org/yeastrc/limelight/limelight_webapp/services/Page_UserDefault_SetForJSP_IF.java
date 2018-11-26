package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

public interface Page_UserDefault_SetForJSP_IF {

	/**
	 * @param controllerPath
	 * @param httpServletRequest
	 */
	void page_UserDefault_SetForJSP(String controllerPath, HttpServletRequest httpServletRequest) throws SQLException;

}