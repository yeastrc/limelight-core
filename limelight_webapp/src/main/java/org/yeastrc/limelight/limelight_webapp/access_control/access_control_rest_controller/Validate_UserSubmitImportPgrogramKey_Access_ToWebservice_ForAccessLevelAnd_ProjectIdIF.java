/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_PgmXML;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result;

/**
 * @author danj
 *
 */
public interface Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF {

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER
	 * @param userSubmitImportPgrogramKey
	 * @param projectId
	 * @return userId, if found and valid
	 * @throws SQLException
	 */
	Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateProjectOwnerAllowed(
			String userSubmitImportPgrogramKey, int projectId,
			SubmitImport_Init_Response_PgmXML submitImport_Init_Response_PgmXML ) throws SQLException;

	/**
	 * @param minimumAccessLevelRequired
	 * @param userSubmitImportPgrogramKey
	 * @param projectId
	 * @return userId, if found and valid
	 * @throws SQLException
	 */
	Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateUserSubmitImportPgrogramKeyAccess_ToWebservice_ForAccessLevelAndProjectId(
			int minimumAccessLevelRequired, String userSubmitImportPgrogramKey, int projectId,
			SubmitImport_Init_Response_PgmXML submitImport_Init_Response_PgmXML ) throws SQLException;

}