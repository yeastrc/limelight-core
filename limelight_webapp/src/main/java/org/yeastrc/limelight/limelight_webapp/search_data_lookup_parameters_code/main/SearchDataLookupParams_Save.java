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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupAssocProjSrchIdDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupAssocProjSrchIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.internal_objects_for_json.RootIdsObj;

/**
 * Save to DB, main and children
 *
 */
@Component
public class SearchDataLookupParams_Save implements SearchDataLookupParams_Save_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParams_Save.class );
	
	@Autowired
	private SearchDataLookupParametersLookupDAO_IF searchDataLookupParametersLookupDAO;
	
	@Autowired
	private SearchDataLookupParametersLookupAssocProjSrchIdDAO_IF searchDataLookupParametersLookupAssocProjSrchIdDAO;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_Save_IF#saveSearchDataLookupParametersLookupDTO_AndChildren(org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO, org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.internal_objects_for_json.RootIdsObj)
	 * 
	 * throws org.springframework.dao.DuplicateKeyException for duplicate record
	 */
	@Override
	
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void saveSearchDataLookupParametersLookupDTO_AndChildren( SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO, RootIdsObj rootIdsObj ) {
		
		searchDataLookupParametersLookupDAO.save( searchDataLookupParametersLookupDTO );

		if ( rootIdsObj.getProjectSearchIds() != null ) {
			for ( Integer projectSearchId : rootIdsObj.getProjectSearchIds() ) {
				
				SearchDataLookupParametersLookupAssocProjSrchIdDTO item = new SearchDataLookupParametersLookupAssocProjSrchIdDTO();
				item.setAssocMainId( searchDataLookupParametersLookupDTO.getId() );
				item.setProjectSearchId( projectSearchId );
				
				searchDataLookupParametersLookupAssocProjSrchIdDAO.save( item );
			}
		
		}
	
	}
}
