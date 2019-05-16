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
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveReportedPeptideAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveReportedPeptideAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableReportedPeptideAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableReportedPeptideAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideDescriptiveAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchReportedPeptideFilterableAnnotationDAO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;

/**
 * Save Reported Peptide level annotations 
 *
 */
public class SaveSearchReportedPeptideAnnotations {

	private static final Logger log = LoggerFactory.getLogger( SaveSearchReportedPeptideAnnotations.class );
	
	/**
	 * private constructor
	 */
	private SaveSearchReportedPeptideAnnotations(){}
	public static SaveSearchReportedPeptideAnnotations getInstance() {
		return new SaveSearchReportedPeptideAnnotations();
	}
	
	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param reportedPeptideId
	 * @param searchProgramEntryMap
	 * @param filterableReportedPeptideAnnotationTypesOnId
	 * @return
	 * @throws Exception
	 */
	public List<SearchReportedPeptideFilterableAnnotationDTO> saveReportedPeptideAnnotations( ReportedPeptide reportedPeptide, int searchId, int reportedPeptideId, Map<String, SearchProgramEntry> searchProgramEntryMap, Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId ) throws Exception {
		List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList = 
				saveReportedPeptideFilterableReportedPeptideAnnotations( reportedPeptide, searchId, reportedPeptideId, searchProgramEntryMap, filterableReportedPeptideAnnotationTypesOnId );
		saveReportedPeptideDescriptiveReportedPeptideAnnotations( reportedPeptide, searchId, reportedPeptideId, searchProgramEntryMap );
		return searchReportedPeptideFilterableAnnotationDTOList;
	}
	
	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param reportedPeptideId
	 * @param searchProgramEntryMap
	 * @throws Exception
	 */
	private List<SearchReportedPeptideFilterableAnnotationDTO> saveReportedPeptideFilterableReportedPeptideAnnotations( 
			ReportedPeptide reportedPeptide, 
			int searchId, 
			int reportedPeptideId, 
			Map<String, SearchProgramEntry> searchProgramEntryMap,
			Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnIdParamMasterCopy ) throws Exception {
		
		List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList = new ArrayList<>();
		//  Make local copy of filterableAnnotationTypesOnIdMasterCopy
		//    since remove entries from it.
		Map<Integer, AnnotationTypeDTO> filterableReportedPeptideAnnotationTypesOnId = new HashMap<>();
		for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableReportedPeptideAnnotationTypesOnIdParamMasterCopy.entrySet() ) {
			filterableReportedPeptideAnnotationTypesOnId.put( entry.getKey(), entry.getValue() );
		}
		ReportedPeptide.ReportedPeptideAnnotations reportedPeptideAnnotations =
				reportedPeptide.getReportedPeptideAnnotations();
		if ( reportedPeptideAnnotations == null ) {
			if ( ! filterableReportedPeptideAnnotationTypesOnId.isEmpty() ) {
				String msg = "No Reported Peptide Filterable annotations on this reported peptide."
						+ "  Filterable annotations are required on all reported peptides."
						+ "  ReportedPeptideString: " + reportedPeptide.getReportedPeptideString();
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			} else {
//				String msg = "No Reported Peptide annotations."
//						+ "  ReportedPeptideString: " + reportedPeptide.getReportedPeptideString();
//
//				log.warn( msg );
			}
		} else {
			FilterableReportedPeptideAnnotations filterableReportedPeptideAnnotations =
					reportedPeptideAnnotations.getFilterableReportedPeptideAnnotations();
			if ( filterableReportedPeptideAnnotations == null ) {
				if ( ! filterableReportedPeptideAnnotationTypesOnId.isEmpty() ) {
					String msg = "No Filterable Reported Peptide Filterable annotations on this reported peptide."
							+ "  Filterable annotations are required on all reported peptides."
							+ "  ReportedPeptideString: " + reportedPeptide.getReportedPeptideString();
					log.error( msg );
					throw new LimelightImporterDataException( msg );
				} else {
					String msg = "No Filterable Reported Peptide annotations."
							+ "  ReportedPeptideString: " + reportedPeptide.getReportedPeptideString();
					log.warn( msg );
				}
			} else {
				List<FilterableReportedPeptideAnnotation> filterableReportedPeptideAnnotationList =
						filterableReportedPeptideAnnotations.getFilterableReportedPeptideAnnotation();
				if ( filterableReportedPeptideAnnotationList == null || filterableReportedPeptideAnnotationList.isEmpty() ) {
					if ( ! filterableReportedPeptideAnnotationTypesOnId.isEmpty() ) {
						String msg = "No Filterable Reported Peptide Filterable annotations on this reported peptide."
								+ "  Filterable annotations are required on all reported peptides."
								+ "  ReportedPeptideString: " + reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					} else {
						String msg = "No Filterable Reported Peptide annotations."
								+ "  ReportedPeptideString: " + reportedPeptide.getReportedPeptideString();
						log.warn( msg );
					}
				} else {
					//  Process list of filterable annotations on input list
					for ( FilterableReportedPeptideAnnotation filterableReportedPeptideAnnotation : filterableReportedPeptideAnnotationList ) {
						String searchProgram = filterableReportedPeptideAnnotation.getSearchProgram();
						String annotationName = filterableReportedPeptideAnnotation.getAnnotationName();
						BigDecimal value = filterableReportedPeptideAnnotation.getValue();
						int annotationTypeId = 
								getReportedPeptideAnnotationTypeId( 
										searchProgram, 
										annotationName, 
										FilterableDescriptiveAnnotationType.FILTERABLE, 
										searchProgramEntryMap );
						if ( filterableReportedPeptideAnnotationTypesOnId.remove( annotationTypeId ) == null ) {
							//  Shouldn't get here
							String msg = "Internal Data mismatch error";
							log.error( msg );
							log.error( "filterableReportedPeptideAnnotationTypesOnId.remove( annotationTypeId ) == null for annotationTypeId: " 
									+ annotationTypeId + ", annotationName: " + annotationName );
							List<String> filterablePsmAnnotationListNames = new ArrayList<>();
							for ( FilterableReportedPeptideAnnotation filterableReportedPeptideAnnotationTemp : filterableReportedPeptideAnnotationList ) {
								String name = filterableReportedPeptideAnnotationTemp.getAnnotationName();
								filterablePsmAnnotationListNames.add(name);
							}
							log.error( "filterableReportedPeptideAnnotationTypesOnId.remove( annotationTypeId ) == null for filterablePsmAnnotationList names: " + StringUtils.join(filterablePsmAnnotationListNames, ",") );
							List<Integer> filterableAnnotationTypeIds = new ArrayList<>();
							for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableReportedPeptideAnnotationTypesOnId.entrySet() ) {
								int key = entry.getKey();
//								AnnotationTypeDTO valueTemp = entry.getValue();
								filterableAnnotationTypeIds.add( key );
							}
							log.error( "filterableReportedPeptideAnnotationTypesOnId.remove( annotationTypeId ) == null for filterableAnnotationTypeIds type ids: " + StringUtils.join(filterableAnnotationTypeIds, ",") );
							throw new LimelightImporterInternalException(msg);
						}
						
						SearchReportedPeptideFilterableAnnotationDTO searchReportedPeptideAnnotationDTO = new SearchReportedPeptideFilterableAnnotationDTO();
						searchReportedPeptideAnnotationDTO.setSearchId( searchId );
						searchReportedPeptideAnnotationDTO.setReportedPeptideId( reportedPeptideId );
						searchReportedPeptideAnnotationDTO.setAnnotationTypeId( annotationTypeId );
						searchReportedPeptideAnnotationDTO.setValueDouble( value.doubleValue() );
						searchReportedPeptideAnnotationDTO.setValueString( value.toString() );
						DB_Insert_SearchReportedPeptideFilterableAnnotationDAO.getInstance().saveToDatabase(searchReportedPeptideAnnotationDTO);
						searchReportedPeptideFilterableAnnotationDTOList.add(searchReportedPeptideAnnotationDTO);
					}
				}
			}
		}
		if ( ! filterableReportedPeptideAnnotationTypesOnId.isEmpty() ) {
			//  Filterable Annotations Types were not on the Filterable Annotations List
			String msg = "Not all Filterable Annotations Types were on the Filterable Annotations List "
					+ " for ReportedPeptide.  "
					+ " for reported peptide string :" 
					+ reportedPeptide.getReportedPeptideString();
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		return searchReportedPeptideFilterableAnnotationDTOList;
	}
	
	/**
	 * @param reportedPeptide
	 * @param searchId
	 * @param reportedPeptideId
	 * @param searchProgramEntryMap
	 * @throws Exception
	 */
	private void saveReportedPeptideDescriptiveReportedPeptideAnnotations( ReportedPeptide reportedPeptide, int searchId, int reportedPeptideId, Map<String, SearchProgramEntry> searchProgramEntryMap ) throws Exception {
		
		ReportedPeptide.ReportedPeptideAnnotations reportedPeptideAnnotations =
				reportedPeptide.getReportedPeptideAnnotations();
		if ( reportedPeptideAnnotations == null ) {
//			String msg = "No Reported Peptide annotations";
//			log.warn( msg );
		} else {
			DescriptiveReportedPeptideAnnotations descriptiveReportedPeptideAnnotations =
					reportedPeptideAnnotations.getDescriptiveReportedPeptideAnnotations();
			if ( descriptiveReportedPeptideAnnotations == null ) {
//				String msg = "No Descriptive Reported Peptide annotations";
//				log.warn( msg );
			} else {
				List<DescriptiveReportedPeptideAnnotation> descriptiveReportedPeptideAnnotationList =
						descriptiveReportedPeptideAnnotations.getDescriptiveReportedPeptideAnnotation();
				if ( descriptiveReportedPeptideAnnotationList == null || descriptiveReportedPeptideAnnotationList.isEmpty() ) {
//					String msg = "No Descriptive Reported Peptide annotations";
//					log.warn( msg );
				} else {
					for ( DescriptiveReportedPeptideAnnotation descriptiveReportedPeptideAnnotation : descriptiveReportedPeptideAnnotationList ) {
						String searchProgram = descriptiveReportedPeptideAnnotation.getSearchProgram();
						String annotationName = descriptiveReportedPeptideAnnotation.getAnnotationName();
						String value = descriptiveReportedPeptideAnnotation.getValue();
						int descriptiveAnnotationTypeId = 
								getReportedPeptideAnnotationTypeId( 
										searchProgram, 
										annotationName, 
										FilterableDescriptiveAnnotationType.DESCRIPTIVE, 
										searchProgramEntryMap );
						SearchReportedPeptideDescriptiveAnnotationDTO searchReportedPeptideAnnotationDTO = new SearchReportedPeptideDescriptiveAnnotationDTO();
						searchReportedPeptideAnnotationDTO.setSearchId( searchId );
						searchReportedPeptideAnnotationDTO.setReportedPeptideId( reportedPeptideId );
						searchReportedPeptideAnnotationDTO.setAnnotationTypeId( descriptiveAnnotationTypeId );
						searchReportedPeptideAnnotationDTO.setValueString( value );
						DB_Insert_SearchReportedPeptideDescriptiveAnnotationDAO.getInstance().saveToDatabase(searchReportedPeptideAnnotationDTO);
					}
				}
			}
		}
	}
	
	/**
	 * @param searchProgram
	 * @param annotationName
	 * @param filterableDescriptiveAnnotationType
	 * @param searchProgramEntryMap
	 * @return
	 * @throws LimelightImporterDataException
	 */
	private int getReportedPeptideAnnotationTypeId( 
			String searchProgram, 
			String annotationName, 
			FilterableDescriptiveAnnotationType filterableDescriptiveAnnotationType,
			Map<String, SearchProgramEntry> searchProgramEntryMap ) throws LimelightImporterDataException {

		if ( filterableDescriptiveAnnotationType == null ) {
			String msg = "Processing error in  getReportedPeptideAnnotationTypeId(...).  filterableDescriptiveAnnotationType == null";
			log.error(msg);
			throw new IllegalArgumentException(msg);
		}

		SearchProgramEntry searchProgramEntry =
				searchProgramEntryMap.get( searchProgram );
		if ( searchProgramEntry == null ) {
			String msg = "Processing filterableReportedPeptideAnnotations: "
					+ " search_program String |"
					+ searchProgram 
					+ "| on Reported Peptide not found under <search_programs> .";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		Map<String, AnnotationTypeDTO> reportedPeptideAnnotationTypeDTOMap =
				searchProgramEntry.getReportedPeptideAnnotationTypeDTOMap();
		AnnotationTypeDTO reportedPeptideAnnotationTypeDTO = 
				reportedPeptideAnnotationTypeDTOMap.get( annotationName );
		if ( reportedPeptideAnnotationTypeDTO == null ) {
			String msg = "Processing " + getPartOfErrorMsg_FOR_getReportedPeptideAnnotationTypeId( filterableDescriptiveAnnotationType ) + ": "
					+ " annotation name String |"
					+ annotationName 
					+ "| on Reported Peptide not found under " 
					+ getPartOfErrorMsg_FOR_getReportedPeptideAnnotationTypeId( filterableDescriptiveAnnotationType ) 
					+ " under <search_programs> for search program: " + searchProgram;
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		if ( filterableDescriptiveAnnotationType != reportedPeptideAnnotationTypeDTO.getFilterableDescriptiveAnnotationType() ) {
			String msg = "Processing Reported PeptideAnnotations "
					+ getPartOfErrorMsg_FOR_getReportedPeptideAnnotationTypeId( filterableDescriptiveAnnotationType ) + ": "
					+ " annotation name not under same 'filterable' or 'descriptive' types under <search_programs>"
					+ " and data under Reported Peptide."
					+ " annotation name String |"
					+ annotationName 
					+ "|.";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		int id = reportedPeptideAnnotationTypeDTO.getId();
		return id;
	}
	
	/**
	 * Get part of error msg for use in method getReportedPeptideAnnotationTypeId(...)
	 * @param filterableDescriptiveAnnotationType
	 * @return
	 */
	private String getPartOfErrorMsg_FOR_getReportedPeptideAnnotationTypeId( FilterableDescriptiveAnnotationType filterableDescriptiveAnnotationType ) {

		if ( filterableDescriptiveAnnotationType == null ) {
			String msg = "Processing error in  getPartOfErrorMsg_FOR_getReportedPeptideAnnotationTypeId(...).  filterableDescriptiveAnnotationType == null";
			log.error(msg);
			throw new IllegalArgumentException(msg);
		}

		if ( filterableDescriptiveAnnotationType == FilterableDescriptiveAnnotationType.FILTERABLE ) {
			return "<filterable_reported_peptide_annotations>";
		} else if ( filterableDescriptiveAnnotationType == FilterableDescriptiveAnnotationType.DESCRIPTIVE ) {
			return "<descriptive_reported_peptide_annotations>";
		} else {
			String msg = "Processing error in  getPartOfErrorMsg_FOR_getReportedPeptideAnnotationTypeId(...).  filterableDescriptiveAnnotationType == not expected value of 'FILTERABLE' or 'DESCRIPTIVE'";
			log.error(msg);
			throw new IllegalArgumentException(msg);
		}
		
	}
}