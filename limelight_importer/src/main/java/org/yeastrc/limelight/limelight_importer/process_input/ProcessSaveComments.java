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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchComments;
import org.yeastrc.limelight.limelight_importer.dao.ProjectSearchCommentDAO;
import org.yeastrc.limelight.limelight_importer.dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchCommentDTO;

/**
 * Save the comments in the Importer Input, if there are any
 *
 */
public class ProcessSaveComments {

	private static final Logger log = LoggerFactory.getLogger( ProcessSaveComments.class );
	

	/**
	 * private constructor
	 */
	private ProcessSaveComments(){}
	public static ProcessSaveComments getInstance() {
		return new ProcessSaveComments();
	}
	
	/**
	 * @param limelightInput
	 * @param search
	 * @param userIdInsertingSearch
	 * @throws Exception
	 */
	public void processComments( 
			LimelightInput limelightInput, 
			ProjectSearchDTO projectSearchDTOInserted,
			Integer userIdInsertingSearch ) throws Exception {
		
		try {
			SearchComments searchComments = limelightInput.getSearchComments();
			
			if ( searchComments == null ) {
				// none so exit
				return; // EARLY EXIT
			}
			
			List<String> searchCommentList =  searchComments.getSearchComment();
	
			if ( searchCommentList == null || searchCommentList.isEmpty() ) {
				// none so exit
				return; // EARLY EXIT
			}
			
			for ( String searchComment : searchCommentList ) {
				
				ProjectSearchCommentDTO projectSearchCommentDTO = new ProjectSearchCommentDTO();
				projectSearchCommentDTO.setProjectSearchId( projectSearchDTOInserted.getId() );
				projectSearchCommentDTO.setCommentText( searchComment );
				projectSearchCommentDTO.setUserIdCreated( userIdInsertingSearch ); 
				projectSearchCommentDTO.setUserIdLastUpdated( userIdInsertingSearch );
				ProjectSearchCommentDAO.getInstance().save( projectSearchCommentDTO );
			}
		} catch ( Exception e ) {
			
			log.error("Failed to save comments to DB", e);
			throw e;
		}
			
	}
}
