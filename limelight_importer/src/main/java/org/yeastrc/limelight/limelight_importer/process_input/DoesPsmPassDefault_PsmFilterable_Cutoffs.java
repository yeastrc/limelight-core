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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;

/**
 * 
 *
 */
public class DoesPsmPassDefault_PsmFilterable_Cutoffs {
	
	private static final Logger log = LoggerFactory.getLogger( DoesPsmPassDefault_PsmFilterable_Cutoffs.class );
	
	//  private constructor 
	private DoesPsmPassDefault_PsmFilterable_Cutoffs() {}
	public static DoesPsmPassDefault_PsmFilterable_Cutoffs getInstance() { return new DoesPsmPassDefault_PsmFilterable_Cutoffs(); }

	/**
	 * Does Psm Pass Default PSM Filterable Cutoffs
	 * 
	 * @param currentPsm_psmAnnotationDTO_Filterable_List
	 * @param bestPsmAnnotationDTO_KeyedOn_AnnotationTypeId
	 * @param filterablePsmAnnotationTypesOnId
	 * @return
	 * @throws LimelightImporterDataException
	 * @throws LimelightImporterInternalException
	 */
	public boolean doesPsmPassDefault_PsmFilterable_Cutoffs( 
			List<PsmFilterableAnnotationDTO> currentPsm_psmAnnotationDTO_Filterable_List,
			Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId
			) throws LimelightImporterDataException, LimelightImporterInternalException {
		
		if ( filterablePsmAnnotationTypesOnId == null ) {
			String msg = "filterablePsmAnnotationTypesOnId == null";
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		if ( filterablePsmAnnotationTypesOnId.isEmpty() ) {
			String msg = "filterablePsmAnnotationTypesOnId.isEmpty() ";
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		
		boolean doesPsmPassDefaultCutoffs = true;  // Default to 'true' and set to 'false' below
		
		for ( PsmFilterableAnnotationDTO currentPsm_psmAnnotationDTO_Filterable : currentPsm_psmAnnotationDTO_Filterable_List ) {
			Integer currentPsm_annotationTypeId = currentPsm_psmAnnotationDTO_Filterable.getAnnotationTypeId();
			AnnotationTypeDTO currentPsm_annotationType =   filterablePsmAnnotationTypesOnId.get( currentPsm_annotationTypeId );
			if ( currentPsm_annotationType == null ) {
				String msg = "currentPsm_annotationType == null for currentPsm_annotationTypeId: " + currentPsm_annotationTypeId;
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			AnnotationTypeFilterableDTO currentPsm_AnnotationTypeFilterableDTO = currentPsm_annotationType.getAnnotationTypeFilterableDTO();
			if ( currentPsm_AnnotationTypeFilterableDTO == null ) {
				String msg = "currentPsm_AnnotationTypeFilterableDTO == null for currentPsm_annotationTypeId: " + currentPsm_annotationTypeId;
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			/////////   Does PSM pass default cutoffs
			if ( currentPsm_AnnotationTypeFilterableDTO.isDefaultFilter() ) {
				
				if ( currentPsm_AnnotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() == null ) {
					
					//  doesPsmPassDefaultCutoffs = true;  // TODO  Is this RIGHT?????  !!!!!!!!!!!!!  Should probably fail the import instead
					
				} else if ( currentPsm_AnnotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					if ( currentPsm_psmAnnotationDTO_Filterable.getValueDouble() 
							< currentPsm_AnnotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
						doesPsmPassDefaultCutoffs = false;
					}
				} else if ( currentPsm_AnnotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
					if ( currentPsm_psmAnnotationDTO_Filterable.getValueDouble() 
							> currentPsm_AnnotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
						doesPsmPassDefaultCutoffs = false;
					}
				} else {
					String msg = " Unexpected FilterDirectionType value:  " + currentPsm_AnnotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum()
							+ ", for currentPsm_annotationTypeId: " + currentPsm_annotationTypeId;
					log.error( msg );
					throw new LimelightImporterDataException(msg);
				}
			
			}
		}	
				
		return doesPsmPassDefaultCutoffs;
	}
}
