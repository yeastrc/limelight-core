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
package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.UrlShortenerDAO.LogDuplicateSQLException;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerAssocExperimentIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerAssocProjectSearchIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerDTO;

/**
 * @author danj
 *
 */
public interface UrlShortener_Insert_UsingDBTransactionServiceIF {

	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 * @param item
	 * @param childrenProjectSearchIds
	 * @param childExperimentId TODO
	 */

	void addUrlShortener(UrlShortenerDTO item, List<UrlShortenerAssocProjectSearchIdDTO> childrenProjectSearchIds,
			UrlShortenerAssocExperimentIdDTO childExperimentId, LogDuplicateSQLException logDuplicateSQLException);

}