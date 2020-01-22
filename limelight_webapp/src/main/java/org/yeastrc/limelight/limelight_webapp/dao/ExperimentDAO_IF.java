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
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;

/**
 * @author danj
 *
 */
public interface ExperimentDAO_IF {
	
	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	public Integer getProjectIdForId( int id ) throws SQLException;
	
	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	Boolean getIsDraftForId( int id ) throws SQLException;
	
	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	public Integer getCreatedByUserIdForId( int id ) throws SQLException;

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	ExperimentDTO getPartialForId(int id) throws SQLException;

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	ExperimentDTO populatePartialFromResultSet(ResultSet rs) throws SQLException;

	/**
	 * @param item
	 */
	void save(ExperimentDTO item);
	
	/**
	 * Update many fields from Webapp
	 * @param item
	 */
	void update( ExperimentDTO item );

	/* 
	 * SET last_accessed = NOW() WHERE id = ?
	 */
	void updateLastAccessed(int id);
	
	/**
	 * @param id
	 */
	public void delete( int id );

}