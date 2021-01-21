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
package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchSubGroupDTO;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchSubGroup__WEB_DAO_IF;

/**
 * 
 *
 */
@Component
public class SubGroups_Update_UserUpdatableData_UsingDBTransactionService implements SubGroups_Update_UserUpdatableData_UsingDBTransactionService_IF {

	private static final Logger log = LoggerFactory.getLogger( SubGroups_Update_UserUpdatableData_UsingDBTransactionService.class );
	
	@Autowired
	private ProjectSearchSubGroup__WEB_DAO_IF projectSearchSubGroup__WEB_DAO;

	//  Spring DB Transactions
	/**
	 * @param projectSearchSubGroupDTOList
	 */
	@Override
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void subGroups_Update_UserUpdatableData( 
			List<ProjectSearchSubGroupDTO> projectSearchSubGroupDTOList ) {
		try {
			
			for ( ProjectSearchSubGroupDTO item : projectSearchSubGroupDTOList  ) {
				
				projectSearchSubGroup__WEB_DAO.insertOrUpdate( item );
			}
			
		} catch ( RuntimeException e ) {
			String msg = "Failed subGroups_Update_UserUpdatableData(...)";
			log.error( msg, e );
			throw e;
		}
	}

}
