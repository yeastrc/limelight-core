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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;

/**
 * @author danj
 *
 */
public interface SearchDataLookupParametersLookupDAO_IF {

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	SearchDataLookupParametersLookupDTO getPartialForId( int id ) throws SQLException;
	
	/**
	 * @param hashOfMainParams
	 * @return
	 * @throws SQLException
	 */
	List<SearchDataLookupParametersLookupDTO> getPartialForHashOfMainParams( String hashOfMainParams ) throws SQLException;
	
	/**
	 * @param hashOfMainParams
	 * @param hashCollisionIndex
	 * @return
	 * @throws SQLException
	 */
	List<SearchDataLookupParametersLookupDTO> getPartialFor_HashOfMainParams_HashCollisionIndex( 
			String hashOfMainParams, int hashCollisionIndex ) throws SQLException;
	
	/**
	 * @param item
	 */
	void save(SearchDataLookupParametersLookupDTO item);
	
	/**
	 * SET single_project_search_id__default_values =? WHERE id = ?
	 * 
	 * @param singleProjecSearchIdDefaultValues
	 * @param id
	 */
	void updateSingleProjecSearchIdDefaultValues( int singleProjecSearchIdDefaultValues, int id );
	
	/**
	 * SET last_accessed = NOW() WHERE id = ?
	 * @param id
	 */
	void updateLastAccessed( int id );
}