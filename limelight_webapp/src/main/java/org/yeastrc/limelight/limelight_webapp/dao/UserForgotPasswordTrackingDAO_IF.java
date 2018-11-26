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

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserForgotPasswordTrackingDTO;

/**
 * @author danj
 *
 */
public interface UserForgotPasswordTrackingDAO_IF {

	/**
	 * @param forgotPasswordTrackingCode
	 * @return null if not found
	 * @throws Exception
	 */
	UserForgotPasswordTrackingDTO getForForgotPasswordTrackingCode(String forgotPasswordTrackingCode) throws Exception;

	/**
	 * @param item
	 * @throws Exception
	 */
	void save(UserForgotPasswordTrackingDTO item) throws Exception;

	/**
		 * Update used_date = NOW() , useIP = ?
		 * @param id
		 * @param useIP
		 * @throws Exception
		 */
	void updateUsedDateUseIP(int id, String useIP) throws Exception;

	/**
		 * Update code_replaced_by_newer = ?
		 * @param id - ID to use in id < ? comparison
		 * @param codeReplacedByNewer
		 * @throws Exception
		 */
	void updateCodeReplacedByNewer(int id, boolean codeReplacedByNewer) throws Exception;

}