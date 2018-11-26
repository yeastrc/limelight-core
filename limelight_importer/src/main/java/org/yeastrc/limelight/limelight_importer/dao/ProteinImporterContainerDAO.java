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
package org.yeastrc.limelight.limelight_importer.dao;


import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.constants.DatabaseAutoIncIdFieldForRecordNotInsertedYetConstants;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceDTO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceVersionDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchProteinSequenceVersionAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.ProteinImporterContainer;
import org.slf4j.Logger;

/**
 * DAO for class ProteinImporterContainer which is not tied to a specific table
 *
 */
public class ProteinImporterContainerDAO {
	
	private static final Logger log = LoggerFactory.getLogger( ProteinImporterContainerDAO.class );
	private ProteinImporterContainerDAO() { }
	public static ProteinImporterContainerDAO getInstance() { return new ProteinImporterContainerDAO(); }
	
	/**
	 * @param proteinImporterContainer
	 * @throws Exception
	 */
	public void saveProteinImporterContainerIfNeeded( ProteinImporterContainer proteinImporterContainer ) throws Exception {
		if ( proteinImporterContainer.getSearchId() == 0 ) {
			String msg = "proteinImporterContainer.getSearchId() == 0, search id is not set.";
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		if ( proteinImporterContainer.isDataInObjectSavedToDB() ) {
			//  Exit since data already saved
			return;  //  EARLY RETURN
		}
		ProteinSequenceDTO proteinSequenceDTO = proteinImporterContainer.getProteinSequenceDTO();
		if ( proteinSequenceDTO.getId() == DatabaseAutoIncIdFieldForRecordNotInsertedYetConstants.DB_AUTO_INC_FIELD_INITIAL_VALUE_FOR_NOT_INSERTED_YET ) {
			//  Protein sequence id zero indicates it has not been saved so save it to get the id.  New object returned. 
			proteinSequenceDTO = 
					ProteinSequenceDAO.getInstance().getProteinSequenceDTO_InsertIfNotInDB( proteinSequenceDTO.getSequence() );
			proteinImporterContainer.setProteinSequenceDTO( proteinSequenceDTO );
		}
		ProteinSequenceVersionDTO proteinSequenceVersionDTO = proteinImporterContainer.getProteinSequenceVersionDTO();
		if ( proteinSequenceVersionDTO.getId() == DatabaseAutoIncIdFieldForRecordNotInsertedYetConstants.DB_AUTO_INC_FIELD_INITIAL_VALUE_FOR_NOT_INSERTED_YET ) {
			//  Protein sequence version id zero indicates it has not been saved so save it to get the id.  New object returned. 
			proteinSequenceVersionDTO.setProteinSequenceId( proteinSequenceDTO.getId() );
			proteinSequenceVersionDTO = 
					ProteinSequenceVersionDAO.getInstance().getProteinSequenceVersionDTO_InsertIfNotInDB( proteinSequenceVersionDTO );
			proteinImporterContainer.setProteinSequenceVersionDTO( proteinSequenceVersionDTO );
		}
		
		List<ProteinSequenceAnnotationDTO> annotationDTOList = proteinImporterContainer.getAnnotationDTOList();
		for ( ProteinSequenceAnnotationDTO annotationDTO : annotationDTOList ) {
			if ( annotationDTO.getId() == 0 ) {
				ProteinSequenceAnnotationDAO.getInstance().getAnnotationId_InsertIfNotInDB( annotationDTO );
			}
		}
		List<SearchProteinSequenceVersionAnnotationDTO> searchProteinSequenceVersionAnnotationDTOList = new ArrayList<>();
		proteinImporterContainer.setSearchProteinSequenceAnnotationDTOList( searchProteinSequenceVersionAnnotationDTOList );
		for ( ProteinSequenceAnnotationDTO annotationDTO : annotationDTOList ) {
			SearchProteinSequenceVersionAnnotationDTO searchProteinSequenceVersionAnnotationDTO = new SearchProteinSequenceVersionAnnotationDTO();
			searchProteinSequenceVersionAnnotationDTO.setSearchId( proteinImporterContainer.getSearchId() );
			searchProteinSequenceVersionAnnotationDTO.setProteinSequenceVersionId( proteinSequenceVersionDTO.getId() );
			searchProteinSequenceVersionAnnotationDTO.setAnnotationId( annotationDTO.getId() );
			SearchProteinSequenceVersionAnnotationDAO.getInstance().saveToDatabase( searchProteinSequenceVersionAnnotationDTO );
			searchProteinSequenceVersionAnnotationDTOList.add( searchProteinSequenceVersionAnnotationDTO );
		}
		proteinImporterContainer.setDataInObjectSavedToDB( true );
	}
}
