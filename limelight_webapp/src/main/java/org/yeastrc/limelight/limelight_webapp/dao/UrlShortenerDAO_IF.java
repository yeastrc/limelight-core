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

import java.sql.SQLException;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.UrlShortenerDAO.LogDuplicateSQLException;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerDTO;

/**
 * @author danj
 *
 */
public interface UrlShortenerDAO_IF {

	/**
	 * Return the smallest id in the database for the url
	 * 
	 * @param url
	 * @return null if not found
	 * @throws SQLException
	 */
	Integer getFirstIdByURL(String url) throws SQLException;

	/**
	 * Return the shortened_url_key for the smallest id in the database for the url
	 * 
	 * @param url
	 * @return null if not found
	 * @throws SQLException
	 */
	String getFirstShortenedURLByURL(String url) throws SQLException;
	
	String getFirstURLByShortenedURLKey( String shortenedUrlKey ) throws SQLException;

	/**
	 * @param item
	 * @param logDuplicateSQLException TODO
	 */
	void save(UrlShortenerDTO item, LogDuplicateSQLException logDuplicateSQLException);

}