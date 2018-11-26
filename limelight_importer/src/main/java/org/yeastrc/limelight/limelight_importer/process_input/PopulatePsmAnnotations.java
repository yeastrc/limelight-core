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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptivePsmAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptivePsmAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;

/**
 * 
 *
 */
public class PopulatePsmAnnotations {

	private static final Logger log = LoggerFactory.getLogger( PopulatePsmAnnotations.class );
	
	/**
	 * private constructor
	 */
	private PopulatePsmAnnotations(){}

	/**
	 * @param searchProgramEntryMap
	 * @return
	 */
	public static PopulatePsmAnnotations getInstance( Map<String, SearchProgramEntry> searchProgramEntryMap, Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId ) {
		PopulatePsmAnnotations populatePsmAnnotations = new PopulatePsmAnnotations();
		populatePsmAnnotations.searchProgramEntryMap = searchProgramEntryMap;
		populatePsmAnnotations.filterableAnnotationTypesOnIdMasterCopy = filterableAnnotationTypesOnId;
		return populatePsmAnnotations;
	}
	
	private Map<String, SearchProgramEntry> searchProgramEntryMap;
	private Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnIdMasterCopy;
	

	/**
	 * @param psm
	 * @param psmDTO
	 * @return List of PSM Filterable annotations
	 * @throws Exception
	 */
	public List<PsmFilterableAnnotationDTO> populatePsmFilterableAnnotations( Psm psm, PsmDTO psmDTO ) throws Exception {
	
		List<PsmFilterableAnnotationDTO> psmAnnotationDTO_Filterable_List = new ArrayList<>();
		//  Make local copy of filterableAnnotationTypesOnIdMasterCopy
		//    since remove entries from it.
		Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId = new HashMap<>();
		for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableAnnotationTypesOnIdMasterCopy.entrySet() ) {
			filterableAnnotationTypesOnId.put( entry.getKey(), entry.getValue() );
		}
		//  Process PSM Filterable Annotation Entries
		FilterablePsmAnnotations filterablePsmAnnotations = psm.getFilterablePsmAnnotations();
		if ( filterablePsmAnnotations == null ) {
			if ( ! filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
				String msg = "No PSM Filterable annotations on this PSM."
						+ "  Filterable annotations are required on all PSMs."
						+ "  Scan Number: " + psm.getScanNumber();
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			} else {
				String msg = "No Filterable PSM annotations";
				log.warn( msg );
			}
		} else {
			List<FilterablePsmAnnotation> filterablePsmAnnotationList = filterablePsmAnnotations.getFilterablePsmAnnotation();
			if ( filterablePsmAnnotationList == null || filterablePsmAnnotationList.isEmpty() ) {
				if ( ! filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
					String msg = "No PSM Filterable annotations on this PSM."
							+ "  Filterable annotations are required on all PSMs."
							+ "  Scan Number: " + psm.getScanNumber();
					log.error( msg );
					throw new LimelightImporterDataException( msg );
				} else {
					String msg = "No Filterable PSM annotations";
					log.warn( msg );
				}				
			} else {
				//  Process list of filterable annotations on input list
				for ( FilterablePsmAnnotation filterablePsmAnnotation : filterablePsmAnnotationList ) {
					String searchProgram = filterablePsmAnnotation.getSearchProgram();
					String annotationName = filterablePsmAnnotation.getAnnotationName();
					BigDecimal value = filterablePsmAnnotation.getValue();
					int annotationTypeId = 
							getPsmAnnotationTypeId( 
									searchProgram, 
									annotationName, 
									FilterableDescriptiveAnnotationType.FILTERABLE );
					if ( filterableAnnotationTypesOnId.remove( annotationTypeId ) == null ) {
						//  Shouldn't get here
						String msg = "Internal Data mismatch error";
						log.error( msg );
						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for annotationTypeId: " 
								+ annotationTypeId + ", annotationName: " + annotationName );
						List<String> filterablePsmAnnotationListNames = new ArrayList<>();
						for ( FilterablePsmAnnotation filterablePsmAnnotationTemp : filterablePsmAnnotationList ) {
							String name = filterablePsmAnnotationTemp.getAnnotationName();
							filterablePsmAnnotationListNames.add(name);
						}
						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for filterablePsmAnnotationList names: " + StringUtils.join(filterablePsmAnnotationListNames, ",") );
						List<Integer> filterableAnnotationTypeIds = new ArrayList<>();
						for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableAnnotationTypesOnId.entrySet() ) {
							int key = entry.getKey();
//							AnnotationTypeDTO valueTemp = entry.getValue();
							filterableAnnotationTypeIds.add( key );
						}
						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for filterableAnnotationTypeIds type ids: " + StringUtils.join(filterableAnnotationTypeIds, ",") );
						throw new LimelightImporterInternalException(msg);
					}
					PsmFilterableAnnotationDTO psmFilterableAnnotationDTO = new PsmFilterableAnnotationDTO();
					psmFilterableAnnotationDTO.setPsmId( psmDTO.getId() );
					psmFilterableAnnotationDTO.setAnnotationTypeId( annotationTypeId );
					psmFilterableAnnotationDTO.setValueDouble( value.doubleValue() );
					psmFilterableAnnotationDTO.setValueString( value.toString() );
					psmAnnotationDTO_Filterable_List.add(psmFilterableAnnotationDTO);
				}
			}
		}
		if ( ! filterableAnnotationTypesOnId.isEmpty() ) {
			//  Filterable Annotations Types were not on the Filterable Annotations List
			String msg = "Not all Filterable Annotations Types were on the Filterable Annotations List for Psm. For Scan Number :" 
					+ psm.getScanNumber();
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		return psmAnnotationDTO_Filterable_List;
	}
	
	/**
	 * @param psm
	 * @param psmDTO
	 * @throws Exception 
	 */
	public List<PsmDescriptiveAnnotationDTO> populatePsmDescriptivePsmAnnotations( Psm psm, PsmDTO psmDTO ) throws Exception {
	
		List<PsmDescriptiveAnnotationDTO> psmAnnotationDTO_Descriptive_List = new ArrayList<>();

		DescriptivePsmAnnotations descriptivePsmAnnotations = psm.getDescriptivePsmAnnotations();
		if ( descriptivePsmAnnotations == null ) {
//			String msg = "No Descriptive PSM annotations";
//			log.warn( msg );
		} else {
			List<DescriptivePsmAnnotation> descriptivePsmAnnotationList =
				descriptivePsmAnnotations.getDescriptivePsmAnnotation();
			if ( descriptivePsmAnnotationList == null || descriptivePsmAnnotationList.isEmpty() ) {
//				String msg = "No Descriptive PSM annotations";
//				log.warn( msg );
			} else {
				for ( DescriptivePsmAnnotation descriptivePsmAnnotation : descriptivePsmAnnotationList ) {
					String searchProgram = descriptivePsmAnnotation.getSearchProgram();
					String annotationName = descriptivePsmAnnotation.getAnnotationName();
					String value = descriptivePsmAnnotation.getValue();
					int annotationTypeId = 
							getPsmAnnotationTypeId( 
									searchProgram, 
									annotationName, 
									FilterableDescriptiveAnnotationType.DESCRIPTIVE );
					PsmDescriptiveAnnotationDTO psmDescriptiveAnnotationDTO = new PsmDescriptiveAnnotationDTO();
					psmDescriptiveAnnotationDTO.setPsmId( psmDTO.getId() );
					psmDescriptiveAnnotationDTO.setAnnotationTypeId( annotationTypeId );
					psmDescriptiveAnnotationDTO.setValueString( value.toString() );
					psmAnnotationDTO_Descriptive_List.add( psmDescriptiveAnnotationDTO );
				}
			}
		}
		
		return psmAnnotationDTO_Descriptive_List;
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
			String msg = "Processing filterablePsmAnnotations: "
					+ " search_program String |"
					+ searchProgram 
					+ "| on PSM not found under <search_programs> ."
					+ "  This is an error in the program that generated the Limelight XML file.";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		Map<String, AnnotationTypeDTO> srchPgmFilterablePsmAnnotationTypeDTOMap =
				searchProgramEntry.getPsmAnnotationTypeDTOMap();
		AnnotationTypeDTO srchPgmFilterablePsmAnnotationTypeDTO = 
				srchPgmFilterablePsmAnnotationTypeDTOMap.get( annotationName );
		if ( srchPgmFilterablePsmAnnotationTypeDTO == null ) {
			String msg = "Processing PsmAnnotations: "
					+ " annotation name String |"
					+ annotationName 
					+ "| on PSM not found under <..._psm_annotation_types> under <search_programs> for search program: " + searchProgram;
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		if ( filterableDescriptiveAnnotationType != srchPgmFilterablePsmAnnotationTypeDTO.getFilterableDescriptiveAnnotationType() ) {
			String msg = "Processing PsmAnnotations: "
					+ "filterableDescriptiveAnnotationType for annotation name not same between types under <search_programs>"
					+ " and data under PSM."
					+ " annotation name String |"
					+ annotationName 
					+ "|.";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		int id = srchPgmFilterablePsmAnnotationTypeDTO.getId();
		return id;
	}
}