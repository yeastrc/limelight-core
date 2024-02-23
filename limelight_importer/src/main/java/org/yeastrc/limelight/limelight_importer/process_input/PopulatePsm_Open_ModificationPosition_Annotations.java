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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveOpenModificationPositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveOpenModificationPositionAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableOpenModificationPositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableOpenModificationPositionAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmOpenModificationPosition;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPosition_DescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPosition_FilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;

/**
 * 
 *
 */
public class PopulatePsm_Open_ModificationPosition_Annotations {

	private static final Logger log = LoggerFactory.getLogger( PopulatePsm_Open_ModificationPosition_Annotations.class );
	
	/**
	 * private constructor
	 */
	private PopulatePsm_Open_ModificationPosition_Annotations(){}

	/**
	 * @param searchProgramEntryMap
	 * @return
	 */
	public static PopulatePsm_Open_ModificationPosition_Annotations getInstance( 
			
			Map<String, SearchProgramEntry> searchProgramEntryMap //, 
//			Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId 	//   MUST change to PsmOpenModificationPosition Filterable Annotations if want to use this code here
			) {
		PopulatePsm_Open_ModificationPosition_Annotations populatePsmAnnotations = new PopulatePsm_Open_ModificationPosition_Annotations();
		
		populatePsmAnnotations.searchProgramEntryMap = searchProgramEntryMap;
//		populatePsmAnnotations.filterableAnnotationTypesOnIdMasterCopy = filterableAnnotationTypesOnId;
		
		return populatePsmAnnotations;
	}
	
	private Map<String, SearchProgramEntry> searchProgramEntryMap;
	
	//   MUST change to PsmOpenModificationPosition Filterable Annotations if want to use this code here
//	private Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnIdMasterCopy;
	

	/**
	 * @param psm
	 * @param psmDTO
	 * @return List of PSM Modification Position Filterable annotations
	 * @throws Exception
	 */
	public List<PsmOpenModificationPosition_FilterableAnnotationDTO> populatePsmOpenModificationPositionilterableAnnotations( 

			PsmOpenModificationPosition psmOpenModificationPosition
			) throws Exception {
		
		//  Method RESULT
		List<PsmOpenModificationPosition_FilterableAnnotationDTO> psmModificationPositionFilterableAnnotationDTO_Filterable_RESULT_List = new ArrayList<>();
		

//		if ( filterableAnnotationTypesOnIdMasterCopy == null || filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
//
//			//   NO Modification Position Filterable Annotation Types
//			
//			ModificationPositionAnnotations modificationPositionAnnotations = psm.getModificationPositionAnnotations();
//			if ( modificationPositionAnnotations != null ) {
//				FilterableModificationPositionAnnotations filterableModificationPositionAnnotations = modificationPositionAnnotations.getFilterableModificationPositionAnnotations();
//				if ( filterableModificationPositionAnnotations != null ) {
//					List<FilterableModificationPositionAnnotation> filterableModificationPositionAnnotationList = filterableModificationPositionAnnotations.getFilterableModificationPositionAnnotation();
//					if ( filterableModificationPositionAnnotationList != null && ( ! filterableModificationPositionAnnotationList.isEmpty() ) ) {
//
//						//   NO Modification Position Filterable Annotation Types BUT HAVE PSM Modification Position Filterable Annotations so error
//						
//						String msg = "NO Modification Position Filterable Annotation Types BUT HAVE PSM Modification Position Filterable Annotations";
//						log.error(msg);
//						throw new LimelightImporterDataException(msg);
//					}
//				}
//			}
//			
//			//   NO Modification Position Filterable Annotation Types so return empty
//			
//			return psmModificationPositionDescriptiveAnnotationDTO_Filterable_RESULT_List;
//		}
	
		
		//  Make local copy of filterableAnnotationTypesOnIdMasterCopy
		//    since remove entries from it.
//		Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId = new HashMap<>();
//		for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableAnnotationTypesOnIdMasterCopy.entrySet() ) {
//			filterableAnnotationTypesOnId.put( entry.getKey(), entry.getValue() );
//		}
//		
		
		FilterableOpenModificationPositionAnnotations filterableOpenModificationPositionAnnotations = psmOpenModificationPosition.getFilterableOpenModificationPositionAnnotations();
		if ( filterableOpenModificationPositionAnnotations == null ) {
//			if ( ! filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
//				String msg = "No PSM Modification Position Filterable annotations on this PSM."
//						+ "  Modification Position Filterable annotations are required on all PSMs for all Modification Position Filterable annotation Types."
//						+ "  Scan Number: " + psm.getScanNumber();
//				log.error( msg );
//				throw new LimelightImporterDataException( msg );
//			}
			
			return psmModificationPositionFilterableAnnotationDTO_Filterable_RESULT_List;  //  EARLY RETURN since NO filterableModificationPositionAnnotations
			
		} else {
			List<FilterableOpenModificationPositionAnnotation> filterableOpenModificationPositionAnnotationList = filterableOpenModificationPositionAnnotations.getFilterableOpenModificationPositionAnnotation();
			if ( filterableOpenModificationPositionAnnotationList == null || filterableOpenModificationPositionAnnotationList.isEmpty() ) {
//				if ( ! filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
//					String msg = "No PSM Modification Position Filterable annotations on this PSM."
//							+ "  Modification Position Filterable annotations are required on all PSMs for all Modification Position Filterable annotation Types."
//							+ "  Scan Number: " + psm.getScanNumber();
//					log.error( msg );
//					throw new LimelightImporterDataException( msg );
//				}			
			} else {

				//  Process list of filterable annotations on input list
				for ( FilterableOpenModificationPositionAnnotation filterableOpenModificationPositionAnnotation : filterableOpenModificationPositionAnnotationList ) {
					
					String searchProgram = filterableOpenModificationPositionAnnotation.getSearchProgram();
					String annotationName = filterableOpenModificationPositionAnnotation.getAnnotationName();
					BigDecimal value = filterableOpenModificationPositionAnnotation.getValue();
					int annotationTypeId = 
							getPsmAnnotationTypeId( 
									searchProgram, 
									annotationName, 
									FilterableDescriptiveAnnotationType.FILTERABLE );
//					if ( filterableAnnotationTypesOnId.remove( annotationTypeId ) == null ) {
//						//  Shouldn't get here
//						String msg = "Internal Data mismatch error";
//						log.error( msg );
//						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for annotationTypeId: " 
//								+ annotationTypeId + ", annotationName: " + annotationName );
//						List<String> filterablePsmOpenModificationPositionAnnotationListNames = new ArrayList<>();
//						for ( FilterableModificationPositionAnnotation filterableModificationPositionAnnotation_Temp : filterableModificationPositionAnnotationList ) {
//							String name = filterableModificationPositionAnnotation_Temp.getAnnotationName();
//							filterablePsmOpenModificationPositionAnnotationListNames.add(name);
//						}
//						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for filterablePsmOpenModificationPositionAnnotationList names: " + StringUtils.join(filterablePsmOpenModificationPositionAnnotationListNames, ",") );
//						List<Integer> filterableAnnotationTypeIds = new ArrayList<>();
//						for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableAnnotationTypesOnId.entrySet() ) {
//							int key = entry.getKey();
////							AnnotationTypeDTO valueTemp = entry.getValue();
//							filterableAnnotationTypeIds.add( key );
//						}
//						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for filterableAnnotationTypeIds type ids: " + StringUtils.join(filterableAnnotationTypeIds, ",") );
//						throw new LimelightImporterInternalException(msg);
//					}
					PsmOpenModificationPosition_FilterableAnnotationDTO psmFilterableAnnotationDTO = new PsmOpenModificationPosition_FilterableAnnotationDTO();
					// psmFilterableAnnotationDTO.setPsmOpenModificationPositionId(psmOpenModificationPositionId); //  Set In Batch Insert
					psmFilterableAnnotationDTO.setAnnotationTypeId( annotationTypeId );
					psmFilterableAnnotationDTO.setValueDouble( value.doubleValue() );
					psmFilterableAnnotationDTO.setValueString( value.toString() );
					psmModificationPositionFilterableAnnotationDTO_Filterable_RESULT_List.add(psmFilterableAnnotationDTO);
				}
			}
		}
//		if ( ! filterableAnnotationTypesOnId.isEmpty() ) {
//			//  Filterable Annotations Types were not on the Filterable Annotations List
//			String msg = "Not all Filterable Annotations Types were on the Filterable Annotations List for Psm Modification Position. For Scan Number :" 
//					+ psm.getScanNumber();
//			log.error( msg );
//			throw new LimelightImporterDataException(msg);
//		}
		return psmModificationPositionFilterableAnnotationDTO_Filterable_RESULT_List;
	}
	
	/**
	 * @param psm
	 * @param psmDTO
	 * @throws Exception 
	 */
	public List<PsmOpenModificationPosition_DescriptiveAnnotationDTO> populatePsmOpenModificationPositionDescriptivePsmAnnotations( 
			
			PsmOpenModificationPosition psmOpenModificationPosition
			) throws Exception {
		
		//  Method RESULT
		List<PsmOpenModificationPosition_DescriptiveAnnotationDTO> psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List = new ArrayList<>();

		DescriptiveOpenModificationPositionAnnotations descriptiveOpenModificationPositionAnnotations = psmOpenModificationPosition.getDescriptiveOpenModificationPositionAnnotations();
		
		if ( descriptiveOpenModificationPositionAnnotations == null ) {
//			String msg = "No Descriptive PSM annotations";
//			log.warn( msg );
		} else {
			List<DescriptiveOpenModificationPositionAnnotation> descriptiveOpenModificationPositionAnnotationList = descriptiveOpenModificationPositionAnnotations.getDescriptiveOpenModificationPositionAnnotation();
			if ( descriptiveOpenModificationPositionAnnotationList == null || descriptiveOpenModificationPositionAnnotationList.isEmpty() ) {
//				String msg = "No Descriptive PSM annotations";
//				log.warn( msg );
			} else {
				
				for ( DescriptiveOpenModificationPositionAnnotation descriptiveOpenModificationPositionAnnotation : descriptiveOpenModificationPositionAnnotationList ) {

					String searchProgram = descriptiveOpenModificationPositionAnnotation.getSearchProgram();
					String annotationName = descriptiveOpenModificationPositionAnnotation.getAnnotationName();
					String value = descriptiveOpenModificationPositionAnnotation.getValue();
					int annotationTypeId = 
							getPsmAnnotationTypeId( 
									searchProgram, 
									annotationName, 
									FilterableDescriptiveAnnotationType.DESCRIPTIVE );
					PsmOpenModificationPosition_DescriptiveAnnotationDTO psmDescriptiveAnnotationDTO = new PsmOpenModificationPosition_DescriptiveAnnotationDTO();
					// psmDescriptiveAnnotationDTO.setPsmOpenModificationPositionId( psmOpenModificationPositionId ); //  Set In Batch Insert
					psmDescriptiveAnnotationDTO.setAnnotationTypeId( annotationTypeId );
					psmDescriptiveAnnotationDTO.setValueString( value.toString() );
					psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List.add( psmDescriptiveAnnotationDTO );
				}
			}
		}
		
		return psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List;
	}
	
	/**
	 * @param searchProgram
	 * @param annotationName
	 * @param filterableDescriptiveAnnotationType
	 * @param searchProgramEntryMap
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private int getPsmAnnotationTypeId( 
			String searchProgram, 
			String annotationName, 
			FilterableDescriptiveAnnotationType filterableDescriptiveAnnotationType
			) throws LimelightImporterDataException {
		
		SearchProgramEntry searchProgramEntry =
				searchProgramEntryMap.get( searchProgram );
		if ( searchProgramEntry == null ) {
			String msg = "Processing Psm ModificationPosition Annotations: "
					+ " search_program String |"
					+ searchProgram 
					+ "| on PSM not found under <search_programs> ."
					+ "  This is an error in the program that generated the Limelight XML file.";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		Map<String, AnnotationTypeDTO> annotationTypeDTOMap =
				searchProgramEntry.getModificationPositionAnnotationTypeDTOMap();
		
		AnnotationTypeDTO annotationTypeDTO = 
				annotationTypeDTOMap.get( annotationName );
		if ( annotationTypeDTO == null ) {
			String msg = "Processing ModificationPositionAnnotations: "
					+ " annotation name String |"
					+ annotationName 
					+ "| on PSM not found under <..._modification_position_annotation_types> under <search_programs> for search program: " + searchProgram;
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		if ( filterableDescriptiveAnnotationType != annotationTypeDTO.getFilterableDescriptiveAnnotationType() ) {
			String msg = "Processing ModificationPositionAnnotations: "
					+ "filterableDescriptiveAnnotationType for annotation name not same between types under <search_programs>"
					+ " and data under PSM ModificationPosition."
					+ " annotation name String |"
					+ annotationName 
					+ "|.";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		int id = annotationTypeDTO.getId();
		return id;
	}
}