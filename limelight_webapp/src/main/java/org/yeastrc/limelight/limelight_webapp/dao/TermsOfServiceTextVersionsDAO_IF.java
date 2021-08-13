/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db_dto.TermsOfServiceTextVersionsDTO;

/**
 * @author danj
 *
 */
public interface TermsOfServiceTextVersionsDAO_IF {

	/**
	 * Get record with largest version_id
	 * @return null if no records
	 * @throws Exception
	 */
	TermsOfServiceTextVersionsDTO getLatest() throws SQLException;

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	TermsOfServiceTextVersionsDTO populateFromResultSet(ResultSet rs) throws SQLException;

	/**
	 * @return null if not found
	 * @throws Exception
	 */
	Integer getLatest_VersionId() throws SQLException;
	
	/**
	 * @return null if not found
	 * @throws Exception
	 */
	String getLatest_VersionIdString() throws SQLException;
	
	/**
	 * @param idString
	 * @return null if not found
	 * @throws Exception
	 */
	Integer getVersionIdForIdString( String idString ) throws SQLException;

	/**
	 * @param idString
	 * @return null if not found
	 * @throws Exception
	 */
	String getTermsOfServiceTextForIdString( String idString ) throws SQLException;
	
	/**
	 * @param item
	 * @param dbConnection
	 * @throws Exception
	 */
	void save(TermsOfServiceTextVersionsDTO item);

}