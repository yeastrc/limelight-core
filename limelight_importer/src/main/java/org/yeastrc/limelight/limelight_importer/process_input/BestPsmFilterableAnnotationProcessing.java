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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;

/**
 * Best PSM Filterable Annotation Processing
 * 
 * One instance of this class per search/reported peptide
 *
 */
public class BestPsmFilterableAnnotationProcessing {

	private static final Logger log = LoggerFactory.getLogger( BestPsmFilterableAnnotationProcessing.class );
	
	//  private constructor 
	private BestPsmFilterableAnnotationProcessing() {}
	
	/**
	 * Get One instance of this class per search/reported peptide
	 * 
	 * @return
	 */
	public static BestPsmFilterableAnnotationProcessing getInstance( Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId ) {
		BestPsmFilterableAnnotationProcessing bestPsmAnnotationProcessing = new BestPsmFilterableAnnotationProcessing();
		bestPsmAnnotationProcessing.filterablePsmAnnotationTypesOnId = filterablePsmAnnotationTypesOnId;
		return bestPsmAnnotationProcessing;
	}
	
	/**
	 * 
	 *
	 */
	private static class BestPsmFilterableAnnotationDTO {
		PsmFilterableAnnotationDTO bestPsmFilterableAnnotationDTO;
	}

	private Map<Integer, AnnotationTypeDTO> filterablePsmAnnotationTypesOnId;
	private Map<Integer, BestPsmFilterableAnnotationDTO> bestPsmFilterableAnnotationDTO_KeyedOn_AnnotationTypeId = new HashMap<>();
	
	/**
	 * @param currentPsm_psmAnnotationDTO_Filterable_List
	 * @throws LimelightImporterDataException
	 */
	public void updateForCurrentPsmFilterableAnnotationData( 
			List<PsmFilterableAnnotationDTO> currentPsm_psmAnnotationDTO_Filterable_List
			) throws LimelightImporterDataException {

		//  TODO  
//			Optimize this so as many of the best currentPsm_psmAnnotationDTO_Filterable 
//			have the same psm id
		
		for ( PsmFilterableAnnotationDTO currentPsm_psmAnnotationDTO_Filterable : currentPsm_psmAnnotationDTO_Filterable_List ) {
			Integer currentPsm_annotationTypeId = currentPsm_psmAnnotationDTO_Filterable.getAnnotationTypeId();
			AnnotationTypeDTO currentPsm_annotationType =   filterablePsmAnnotationTypesOnId.get( currentPsm_annotationTypeId );
			AnnotationTypeFilterableDTO currentPsm_AnnotationTypeFilterableDTO = currentPsm_annotationType.getAnnotationTypeFilterableDTO();
			if ( currentPsm_AnnotationTypeFilterableDTO == null ) {
				String msg = "currentPsm_AnnotationTypeFilterableDTO == null for currentPsm_annotationTypeId: " + currentPsm_annotationTypeId;
				log.error( msg );
				throw new LimelightImporterDataException(msg);
			}
			/////////   Update Best PSM Annotation DTO
			BestPsmFilterableAnnotationDTO bestPsmFilterableAnnotationDTO = 
					bestPsmFilterableAnnotationDTO_KeyedOn_AnnotationTypeId.get( currentPsm_annotationTypeId );
			if ( bestPsmFilterableAnnotationDTO == null ) {
				bestPsmFilterableAnnotationDTO = new BestPsmFilterableAnnotationDTO();
				bestPsmFilterableAnnotationDTO.bestPsmFilterableAnnotationDTO = currentPsm_psmAnnotationDTO_Filterable;
				bestPsmFilterableAnnotationDTO_KeyedOn_AnnotationTypeId.put( currentPsm_annotationTypeId, bestPsmFilterableAnnotationDTO );
			} else {
				if ( currentPsm_AnnotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					if ( currentPsm_psmAnnotationDTO_Filterable.getValueDouble() 
							> bestPsmFilterableAnnotationDTO.bestPsmFilterableAnnotationDTO.getValueDouble() ) {
						bestPsmFilterableAnnotationDTO.bestPsmFilterableAnnotationDTO = currentPsm_psmAnnotationDTO_Filterable;
					}
				} else if ( currentPsm_AnnotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
					if ( currentPsm_psmAnnotationDTO_Filterable.getValueDouble() 
							< bestPsmFilterableAnnotationDTO.bestPsmFilterableAnnotationDTO.getValueDouble() ) {
						bestPsmFilterableAnnotationDTO.bestPsmFilterableAnnotationDTO = currentPsm_psmAnnotationDTO_Filterable;
					}
				} else {
					String msg = " Unexpected FilterDirectionType value:  " + currentPsm_AnnotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum()
							+ ", for currentPsm_annotationTypeId: " + currentPsm_annotationTypeId;
					log.error( msg );
					throw new LimelightImporterDataException(msg);
				}
			}
		}		
	}
	
	/**
	 * @param unifiedRepPep_Search_ReportedPeptide__Lookup__DTO
	 * @return
	 */
	public List<UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO> getBestPsmValues( 
			UnifiedRepPep_Search_ReportedPeptide__Lookup__DTO unifiedRepPep_Search_ReportedPeptide__Lookup__DTO
			) {
		List<UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO> results = new ArrayList<>( bestPsmFilterableAnnotationDTO_KeyedOn_AnnotationTypeId.entrySet().size() );
		for ( Map.Entry<Integer, BestPsmFilterableAnnotationDTO> entry : bestPsmFilterableAnnotationDTO_KeyedOn_AnnotationTypeId.entrySet() ) {
			BestPsmFilterableAnnotationDTO bestPsmFilterableAnnotationDTO = entry.getValue();
			PsmFilterableAnnotationDTO psmAnnotationDTO = bestPsmFilterableAnnotationDTO.bestPsmFilterableAnnotationDTO;
			UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO unifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO =
					new UnifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO( unifiedRepPep_Search_ReportedPeptide__Lookup__DTO );
			unifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO.setAnnotationTypeId( psmAnnotationDTO.getAnnotationTypeId() );
			unifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO.setBestPsmValueForAnnTypeId( psmAnnotationDTO.getValueDouble() );
			unifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO.setPsmIdForBestValue( psmAnnotationDTO.getPsmId() );
			results.add( unifiedRepPep_Search_ReportedPeptide_BestPsmValue_Lookup__DTO );
		}	
		return results;
	}
}
