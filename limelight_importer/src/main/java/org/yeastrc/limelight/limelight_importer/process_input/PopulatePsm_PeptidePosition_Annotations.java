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
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmPeptidePositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmPeptidePositionAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmPeptidePositionAnnotations;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmPeptidePositionFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;

/**
 * 
 *
 */
public class PopulatePsm_PeptidePosition_Annotations {

	private static final Logger log = LoggerFactory.getLogger( PopulatePsm_PeptidePosition_Annotations.class );
	
	/**
	 * private constructor
	 */
	private PopulatePsm_PeptidePosition_Annotations(){}

	/**
	 * @param searchProgramEntryMap
	 * @return
	 */
	public static PopulatePsm_PeptidePosition_Annotations getInstance( 
			
			Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object,
			Map<String, SearchProgramEntry> searchProgramEntryMap //, 
//			Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId 	//   MUST change to PsmPeptidePosition Filterable Annotations if want to use this code here
			) {
		PopulatePsm_PeptidePosition_Annotations populatePsmAnnotations = new PopulatePsm_PeptidePosition_Annotations();
		
		populatePsmAnnotations.internalHolder_ReportedPeptide_Object = internalHolder_ReportedPeptide_Object;
		populatePsmAnnotations.searchProgramEntryMap = searchProgramEntryMap;
//		populatePsmAnnotations.filterableAnnotationTypesOnIdMasterCopy = filterableAnnotationTypesOnId;
		
		return populatePsmAnnotations;
	}
	
	private Map<String, SearchProgramEntry> searchProgramEntryMap;
	
	//   MUST change to PsmPeptidePosition Filterable Annotations if want to use this code here
//	private Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnIdMasterCopy;
	
	private Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object;
	

	/**
	 * @param psm
	 * @param psmDTO
	 * @return List of PSM Peptide Position Filterable annotations
	 * @throws Exception
	 */
	public List<PsmPeptidePositionFilterableAnnotationDTO> populatePsmPeptidePositionilterableAnnotations( Psm psm, PsmDTO psmDTO ) throws Exception {
		
		//  Method RESULT
		List<PsmPeptidePositionFilterableAnnotationDTO> psmPeptidePositionFilterableAnnotationDTO_Filterable_RESULT_List = new ArrayList<>();
		

//		if ( filterableAnnotationTypesOnIdMasterCopy == null || filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
//
//			//   NO Peptide Position Filterable Annotation Types
//			
//			PeptidePositionAnnotations peptidePositionAnnotations = psm.getPeptidePositionAnnotations();
//			if ( peptidePositionAnnotations != null ) {
//				FilterablePsmPeptidePositionAnnotations filterablePeptidePositionAnnotations = peptidePositionAnnotations.getFilterablePsmPeptidePositionAnnotations();
//				if ( filterablePeptidePositionAnnotations != null ) {
//					List<FilterablePsmPeptidePositionAnnotation> filterablePeptidePositionAnnotationList = filterablePeptidePositionAnnotations.getFilterablePsmPeptidePositionAnnotation();
//					if ( filterablePeptidePositionAnnotationList != null && ( ! filterablePeptidePositionAnnotationList.isEmpty() ) ) {
//
//						//   NO Peptide Position Filterable Annotation Types BUT HAVE PSM Peptide Position Filterable Annotations so error
//						
//						String msg = "NO Peptide Position Filterable Annotation Types BUT HAVE PSM Peptide Position Filterable Annotations";
//						log.error(msg);
//						throw new LimelightImporterDataException(msg);
//					}
//				}
//			}
//			
//			//   NO Peptide Position Filterable Annotation Types so return empty
//			
//			return psmPeptidePositionDescriptiveAnnotationDTO_Filterable_RESULT_List;
//		}
	
		
		//  Make local copy of filterableAnnotationTypesOnIdMasterCopy
		//    since remove entries from it.
//		Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId = new HashMap<>();
//		for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableAnnotationTypesOnIdMasterCopy.entrySet() ) {
//			filterableAnnotationTypesOnId.put( entry.getKey(), entry.getValue() );
//		}
//		
		
		//  Process PSM Peptide Position Filterable Annotation Entries
		
		PsmPeptidePositionAnnotations peptidePositionAnnotations = psm.getPsmPeptidePositionAnnotations();
		
		if ( peptidePositionAnnotations == null ) {
			
			return psmPeptidePositionFilterableAnnotationDTO_Filterable_RESULT_List;  //  EARLY RETURN since NO peptidePositionAnnotations
		}
		 
		FilterablePsmPeptidePositionAnnotations filterablePeptidePositionAnnotations = peptidePositionAnnotations.getFilterablePsmPeptidePositionAnnotations();
		if ( filterablePeptidePositionAnnotations == null ) {
//			if ( ! filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
//				String msg = "No PSM Peptide Position Filterable annotations on this PSM."
//						+ "  Peptide Position Filterable annotations are required on all PSMs for all Peptide Position Filterable annotation Types."
//						+ "  Scan Number: " + psm.getScanNumber();
//				log.error( msg );
//				throw new LimelightImporterDataException( msg );
//			}
			
			return psmPeptidePositionFilterableAnnotationDTO_Filterable_RESULT_List;  //  EARLY RETURN since NO filterablePeptidePositionAnnotations
			
		} else {
			List<FilterablePsmPeptidePositionAnnotation> filterablePeptidePositionAnnotationList = filterablePeptidePositionAnnotations.getFilterablePsmPeptidePositionAnnotation();
			if ( filterablePeptidePositionAnnotationList == null || filterablePeptidePositionAnnotationList.isEmpty() ) {
//				if ( ! filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
//					String msg = "No PSM Peptide Position Filterable annotations on this PSM."
//							+ "  Peptide Position Filterable annotations are required on all PSMs for all Peptide Position Filterable annotation Types."
//							+ "  Scan Number: " + psm.getScanNumber();
//					log.error( msg );
//					throw new LimelightImporterDataException( msg );
//				}			
			} else {

				//  Process list of filterable annotations on input list
				for ( FilterablePsmPeptidePositionAnnotation filterablePeptidePositionAnnotation : filterablePeptidePositionAnnotationList ) {
					
					String searchProgram = filterablePeptidePositionAnnotation.getSearchProgram();
					String annotationName = filterablePeptidePositionAnnotation.getAnnotationName();
					BigDecimal value = filterablePeptidePositionAnnotation.getValue();
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
//						List<String> filterablePsmPeptidePositionAnnotationListNames = new ArrayList<>();
//						for ( FilterablePsmPeptidePositionAnnotation filterablePeptidePositionAnnotation_Temp : filterablePeptidePositionAnnotationList ) {
//							String name = filterablePeptidePositionAnnotation_Temp.getAnnotationName();
//							filterablePsmPeptidePositionAnnotationListNames.add(name);
//						}
//						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for filterablePsmPeptidePositionAnnotationList names: " + StringUtils.join(filterablePsmPeptidePositionAnnotationListNames, ",") );
//						List<Integer> filterableAnnotationTypeIds = new ArrayList<>();
//						for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableAnnotationTypesOnId.entrySet() ) {
//							int key = entry.getKey();
////							AnnotationTypeDTO valueTemp = entry.getValue();
//							filterableAnnotationTypeIds.add( key );
//						}
//						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for filterableAnnotationTypeIds type ids: " + StringUtils.join(filterableAnnotationTypeIds, ",") );
//						throw new LimelightImporterInternalException(msg);
//					}
					PsmPeptidePositionFilterableAnnotationDTO psmFilterableAnnotationDTO = new PsmPeptidePositionFilterableAnnotationDTO();
					psmFilterableAnnotationDTO.setPsmId( psmDTO.getId() );
					psmFilterableAnnotationDTO.setAnnotationTypeId( annotationTypeId );
					psmFilterableAnnotationDTO.setPeptidePosition( filterablePeptidePositionAnnotation.getPosition().intValue() );
					psmFilterableAnnotationDTO.setValueDouble( value.doubleValue() );
					psmFilterableAnnotationDTO.setValueString( value.toString() );
					psmPeptidePositionFilterableAnnotationDTO_Filterable_RESULT_List.add(psmFilterableAnnotationDTO);
				}
			}
		}
//		if ( ! filterableAnnotationTypesOnId.isEmpty() ) {
//			//  Filterable Annotations Types were not on the Filterable Annotations List
//			String msg = "Not all Filterable Annotations Types were on the Filterable Annotations List for Psm Peptide Position. For Scan Number :" 
//					+ psm.getScanNumber();
//			log.error( msg );
//			throw new LimelightImporterDataException(msg);
//		}
		return psmPeptidePositionFilterableAnnotationDTO_Filterable_RESULT_List;
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
			String msg = "Processing Psm PeptidePosition Annotations: "
					+ " search_program String |"
					+ searchProgram 
					+ "| on PSM not found under <search_programs> ."
					+ "  This is an error in the program that generated the Limelight XML file.";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		Map<String, AnnotationTypeDTO> annotationTypeDTOMap =
				searchProgramEntry.getPsmPeptidePositionAnnotationTypeDTOMap();
		
		AnnotationTypeDTO annotationTypeDTO = 
				annotationTypeDTOMap.get( annotationName );
		if ( annotationTypeDTO == null ) {
			String msg = "Processing PeptidePositionAnnotations: "
					+ " annotation name String |"
					+ annotationName 
					+ "| on PSM not found under <..._peptide_position_annotation_types> under <search_programs> for search program: " + searchProgram;
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		if ( filterableDescriptiveAnnotationType != annotationTypeDTO.getFilterableDescriptiveAnnotationType() ) {
			String msg = "Processing PeptidePositionAnnotations: "
					+ "filterableDescriptiveAnnotationType for annotation name not same between types under <search_programs>"
					+ " and data under PSM PeptidePosition."
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