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
package org.yeastrc.limelight.limelight_importer.searcher_psm_peptide_cutoff_utils;

import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;

/**
 * Create SearcherCutoffValuesSearchLevel with default values from Annotation Type records
 *
 */
public class CreateSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords {

	private static final Logger log = LoggerFactory.getLogger( CreateSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords.class );
	
	/**
	 * private constructor
	 */
	private CreateSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords() { }
	public static CreateSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords getInstance() {
		return new CreateSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords();
	}
	
	/**
	 * Create SearcherCutoffValuesSearchLevel with default values from Annotation Type records
	 * 
	 * @param searchId
	 * @param srchPgm_Filterable_Psm_AnnotationType_DTOList
	 * @param srchPgm_Filterable_ReportedPeptide_AnnotationType_DTOList
	 * @return
	 * @throws LimelightImporterInternalException 
	 * @throws Exception 
	 */
	public SearcherCutoffValuesSearchLevel createSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords( 

			int searchId,
			
			List<AnnotationTypeDTO> srchPgm_Filterable_Psm_AnnotationType_DTOList,
			
			List<AnnotationTypeDTO> srchPgm_Filterable_ReportedPeptide_AnnotationType_DTOList

			) throws LimelightImporterInternalException {
		

		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = new SearcherCutoffValuesSearchLevel();
		
		searcherCutoffValuesSearchLevel.setProjectSearchId( searchId );
		
		
		for ( AnnotationTypeDTO item : srchPgm_Filterable_Psm_AnnotationType_DTOList ) {

			if ( item.getAnnotationTypeFilterableDTO() == null ) {
				
				String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + item.getId();
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			if ( item.getAnnotationTypeFilterableDTO().isDefaultFilter() ) {

				SearcherCutoffValuesAnnotationLevel output = new SearcherCutoffValuesAnnotationLevel();

				output.setAnnotationTypeId( item.getId() );
				output.setAnnotationCutoffValue( item.getAnnotationTypeFilterableDTO().getDefaultFilterValue() );
				output.setAnnotationTypeDTO( item );
				
				searcherCutoffValuesSearchLevel.addPsmPerAnnotationCutoffs( output );
			}
		}

		for ( AnnotationTypeDTO item : srchPgm_Filterable_ReportedPeptide_AnnotationType_DTOList ) {

			if ( item.getAnnotationTypeFilterableDTO() == null ) {
				
				String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + item.getId();
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			if ( item.getAnnotationTypeFilterableDTO().isDefaultFilter() ) {

				SearcherCutoffValuesAnnotationLevel output = new SearcherCutoffValuesAnnotationLevel();

				output.setAnnotationTypeId( item.getId() );
				output.setAnnotationCutoffValue( item.getAnnotationTypeFilterableDTO().getDefaultFilterValue() );
				output.setAnnotationTypeDTO( item );

				searcherCutoffValuesSearchLevel.addPeptidePerAnnotationCutoffs( output );
			}
		}
		
		
		return searcherCutoffValuesSearchLevel;
	}

}
