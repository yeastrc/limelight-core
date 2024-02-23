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
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveModificationPositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveModificationPositionAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableModificationPositionAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableModificationPositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ModificationPositionAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPeptDynamicModDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;

/**
 * 
 *
 */
public class PopulatePsm_ModificationPosition_Annotations {

	private static final Logger log = LoggerFactory.getLogger( PopulatePsm_ModificationPosition_Annotations.class );
	
	/**
	 * private constructor
	 */
	private PopulatePsm_ModificationPosition_Annotations(){}

	/**
	 * @param searchProgramEntryMap
	 * @return
	 */
	public static PopulatePsm_ModificationPosition_Annotations getInstance( 
			
			Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object,
			Map<String, SearchProgramEntry> searchProgramEntryMap //, 
//			Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnId 	//   MUST change to PsmModificationPosition Filterable Annotations if want to use this code here
			) {
		PopulatePsm_ModificationPosition_Annotations populatePsmAnnotations = new PopulatePsm_ModificationPosition_Annotations();
		
		populatePsmAnnotations.internalHolder_ReportedPeptide_Object = internalHolder_ReportedPeptide_Object;
		populatePsmAnnotations.searchProgramEntryMap = searchProgramEntryMap;
//		populatePsmAnnotations.filterableAnnotationTypesOnIdMasterCopy = filterableAnnotationTypesOnId;
		
		return populatePsmAnnotations;
	}
	
	private Map<String, SearchProgramEntry> searchProgramEntryMap;
	
	//   MUST change to PsmModificationPosition Filterable Annotations if want to use this code here
//	private Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesOnIdMasterCopy;
	
	private Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object;
	

	/**
	 * @param psm
	 * @param psmDTO
	 * @return List of PSM Modification Position Filterable annotations
	 * @throws Exception
	 */
	public List<PsmModificationPositionFilterableAnnotationDTO> populatePsmModificationPositionilterableAnnotations( Psm psm, PsmDTO psmDTO ) throws Exception {
		
		//  Method RESULT
		List<PsmModificationPositionFilterableAnnotationDTO> psmModificationPositionFilterableAnnotationDTO_Filterable_RESULT_List = new ArrayList<>();
		

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
		
		//  Process PSM Modification Position Filterable Annotation Entries
		
		ModificationPositionAnnotations modificationPositionAnnotations = psm.getModificationPositionAnnotations();
		
		if ( modificationPositionAnnotations == null ) {
			
			return psmModificationPositionFilterableAnnotationDTO_Filterable_RESULT_List;  //  EARLY RETURN since NO modificationPositionAnnotations
		}
		 
		FilterableModificationPositionAnnotations filterableModificationPositionAnnotations = modificationPositionAnnotations.getFilterableModificationPositionAnnotations();
		if ( filterableModificationPositionAnnotations == null ) {
//			if ( ! filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
//				String msg = "No PSM Modification Position Filterable annotations on this PSM."
//						+ "  Modification Position Filterable annotations are required on all PSMs for all Modification Position Filterable annotation Types."
//						+ "  Scan Number: " + psm.getScanNumber();
//				log.error( msg );
//				throw new LimelightImporterDataException( msg );
//			}
			
			return psmModificationPositionFilterableAnnotationDTO_Filterable_RESULT_List;  //  EARLY RETURN since NO filterableModificationPositionAnnotations
			
		} else {
			List<FilterableModificationPositionAnnotation> filterableModificationPositionAnnotationList = filterableModificationPositionAnnotations.getFilterableModificationPositionAnnotation();
			if ( filterableModificationPositionAnnotationList == null || filterableModificationPositionAnnotationList.isEmpty() ) {
//				if ( ! filterableAnnotationTypesOnIdMasterCopy.isEmpty() ) {
//					String msg = "No PSM Modification Position Filterable annotations on this PSM."
//							+ "  Modification Position Filterable annotations are required on all PSMs for all Modification Position Filterable annotation Types."
//							+ "  Scan Number: " + psm.getScanNumber();
//					log.error( msg );
//					throw new LimelightImporterDataException( msg );
//				}			
			} else {

				Map<BigInteger, SrchRepPeptDynamicModDTO> srchRepPeptDynamicModDTO_Map_Key_InputXML_Element_PeptideModification_Attribute_Id =
						internalHolder_ReportedPeptide_Object.getSrchRepPeptDynamicModDTO_Map_Key_InputXML_Element_PeptideModification_Attribute_Id();
				
				if ( srchRepPeptDynamicModDTO_Map_Key_InputXML_Element_PeptideModification_Attribute_Id == null ) {
					String msg = "Have <filterable_modification_position_annotation> but NO reported peptide modifications have 'id' attribute.";  //  TODO  fix error message;
					log.error(msg);
					throw new LimelightImporterDataException(msg);
				}
				
				//  Process list of filterable annotations on input list
				for ( FilterableModificationPositionAnnotation filterableModificationPositionAnnotation : filterableModificationPositionAnnotationList ) {
					
					SrchRepPeptDynamicModDTO srchRepPeptDynamicModDTO = srchRepPeptDynamicModDTO_Map_Key_InputXML_Element_PeptideModification_Attribute_Id.get( filterableModificationPositionAnnotation.getPeptideModificationId() );
					if ( srchRepPeptDynamicModDTO == null ) {
						String msg = "Have <filterable_modification_position_annotation> but 'peptide_modification_id' NOT FOUND IN reported peptide modifications 'id' attribute.";  //  TODO  fix error message;
						log.error(msg);
						throw new LimelightImporterDataException(msg);
					}
					
					if ( ! srchRepPeptDynamicModDTO.isIdPropertySet() ) {
						String msg = "( ! srchRepPeptDynamicModDTO.isIdPropertySet() )";
						log.error(msg);
						throw new LimelightImporterInternalException(msg);
					}
					
					int search_ReportedPeptide_DynamicMod_Id = srchRepPeptDynamicModDTO.getId();
					
					String searchProgram = filterableModificationPositionAnnotation.getSearchProgram();
					String annotationName = filterableModificationPositionAnnotation.getAnnotationName();
					BigDecimal value = filterableModificationPositionAnnotation.getValue();
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
//						List<String> filterablePsmModificationPositionAnnotationListNames = new ArrayList<>();
//						for ( FilterableModificationPositionAnnotation filterableModificationPositionAnnotation_Temp : filterableModificationPositionAnnotationList ) {
//							String name = filterableModificationPositionAnnotation_Temp.getAnnotationName();
//							filterablePsmModificationPositionAnnotationListNames.add(name);
//						}
//						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for filterablePsmModificationPositionAnnotationList names: " + StringUtils.join(filterablePsmModificationPositionAnnotationListNames, ",") );
//						List<Integer> filterableAnnotationTypeIds = new ArrayList<>();
//						for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableAnnotationTypesOnId.entrySet() ) {
//							int key = entry.getKey();
////							AnnotationTypeDTO valueTemp = entry.getValue();
//							filterableAnnotationTypeIds.add( key );
//						}
//						log.error( "filterableAnnotationTypesOnId.remove( annotationTypeId ) == null for filterableAnnotationTypeIds type ids: " + StringUtils.join(filterableAnnotationTypeIds, ",") );
//						throw new LimelightImporterInternalException(msg);
//					}
					PsmModificationPositionFilterableAnnotationDTO psmFilterableAnnotationDTO = new PsmModificationPositionFilterableAnnotationDTO();
					psmFilterableAnnotationDTO.setPsmId( psmDTO.getId() );
					psmFilterableAnnotationDTO.setSearch_ReportedPeptide_DynamicMod_Id(search_ReportedPeptide_DynamicMod_Id);
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
	public List<PsmModificationPositionDescriptiveAnnotationDTO> populatePsmModificationPositionDescriptivePsmAnnotations( Psm psm, PsmDTO psmDTO ) throws Exception {

		//  Method RESULT
		List<PsmModificationPositionDescriptiveAnnotationDTO> psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List = new ArrayList<>();

		ModificationPositionAnnotations modificationPositionAnnotations = psm.getModificationPositionAnnotations();
		
		if ( modificationPositionAnnotations == null ) {
			
			return psmModificationPositionDescriptiveAnnotationDTO_Descriptive_List;  //  EARLY RETURN since NO modificationPositionAnnotations
		}
		 
		DescriptiveModificationPositionAnnotations descriptiveModificationPositionAnnotations = modificationPositionAnnotations.getDescriptiveModificationPositionAnnotations();
		if ( descriptiveModificationPositionAnnotations == null ) {
//			String msg = "No Descriptive PSM annotations";
//			log.warn( msg );
		} else {
			List<DescriptiveModificationPositionAnnotation> descriptiveModificationPositionAnnotationList = descriptiveModificationPositionAnnotations.getDescriptiveModificationPositionAnnotation();
			if ( descriptiveModificationPositionAnnotationList == null || descriptiveModificationPositionAnnotationList.isEmpty() ) {
//				String msg = "No Descriptive PSM annotations";
//				log.warn( msg );
			} else {

				Map<BigInteger, SrchRepPeptDynamicModDTO> srchRepPeptDynamicModDTO_Map_Key_InputXML_Element_PeptideModification_Attribute_Id =
						internalHolder_ReportedPeptide_Object.getSrchRepPeptDynamicModDTO_Map_Key_InputXML_Element_PeptideModification_Attribute_Id();
				
				if ( srchRepPeptDynamicModDTO_Map_Key_InputXML_Element_PeptideModification_Attribute_Id == null ) {
					String msg = "Have <descriptive_modification_position_annotation> but NO reported peptide modifications have 'id' attribute.";  //  TODO  fix error message;
					log.error(msg);
					throw new LimelightImporterDataException(msg);
				}
				
				for ( DescriptiveModificationPositionAnnotation descriptiveModificationPositionAnnotation : descriptiveModificationPositionAnnotationList ) {

					SrchRepPeptDynamicModDTO srchRepPeptDynamicModDTO = srchRepPeptDynamicModDTO_Map_Key_InputXML_Element_PeptideModification_Attribute_Id.get( descriptiveModificationPositionAnnotation.getPeptideModificationId() );
					if ( srchRepPeptDynamicModDTO == null ) {
						String msg = "Have <descriptive_modification_position_annotation> but 'peptide_modification_id' NOT FOUND IN reported peptide modifications 'id' attribute.";  //  TODO  fix error message;
						log.error(msg);
						throw new LimelightImporterDataException(msg);
					}
					
					if ( ! srchRepPeptDynamicModDTO.isIdPropertySet() ) {
						String msg = "( ! srchRepPeptDynamicModDTO.isIdPropertySet() )";
						log.error(msg);
						throw new LimelightImporterInternalException(msg);
					}

					int search_ReportedPeptide_DynamicMod_Id = srchRepPeptDynamicModDTO.getId();
					
					String searchProgram = descriptiveModificationPositionAnnotation.getSearchProgram();
					String annotationName = descriptiveModificationPositionAnnotation.getAnnotationName();
					String value = descriptiveModificationPositionAnnotation.getValue();
					int annotationTypeId = 
							getPsmAnnotationTypeId( 
									searchProgram, 
									annotationName, 
									FilterableDescriptiveAnnotationType.DESCRIPTIVE );
					PsmModificationPositionDescriptiveAnnotationDTO psmDescriptiveAnnotationDTO = new PsmModificationPositionDescriptiveAnnotationDTO();
					psmDescriptiveAnnotationDTO.setPsmId( psmDTO.getId() );
					psmDescriptiveAnnotationDTO.setSearch_ReportedPeptide_DynamicMod_Id(search_ReportedPeptide_DynamicMod_Id);
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