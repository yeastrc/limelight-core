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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveReportedPeptideAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveReportedPeptideAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveMatchedProteinAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptivePsmAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptivePsmAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableReportedPeptideAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableReportedPeptideAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableMatchedProteinAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgram;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgramInfo;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchPrograms;
import org.yeastrc.limelight.limelight_importer.dao.AnnotationTypeDAO;
import org.yeastrc.limelight.limelight_importer.dao.SearchProgramsPerSearchDAO;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;

/**
 * Process <search_programs> entries and their children
 * Insert them into the database and return a Map of Maps to go from names to IDs
 *
 */
public class ProcessSearchProgramEntries {
	
	private static final Logger log = LoggerFactory.getLogger( ProcessSearchProgramEntries.class );
	
	/**
	 * private constructor
	 */
	private ProcessSearchProgramEntries(){}
	public static ProcessSearchProgramEntries getInstance() {
		return new ProcessSearchProgramEntries();
	}
	
	/**
	 * @param limelightInput
	 * @param searchId
	 * @return
	 * @throws Exception
	 */
	public Map<String, SearchProgramEntry> processSearchProgramEntries( LimelightInput limelightInput, int searchId ) throws Exception {
		
		Map<String, SearchProgramEntry> searchProgramEntryMap = new HashMap<>();
		SearchProgramInfo searchProgramInfo = limelightInput.getSearchProgramInfo(); 
		SearchPrograms limelightInputSearchPrograms = searchProgramInfo.getSearchPrograms();
		List<SearchProgram> searchProgramList =
				limelightInputSearchPrograms.getSearchProgram();
		for ( SearchProgram searchProgram : searchProgramList ) {
			
			SearchProgramsPerSearchDTO searchProgramsPerSearchDTO = new SearchProgramsPerSearchDTO();
			searchProgramsPerSearchDTO.setSearchId( searchId );
			searchProgramsPerSearchDTO.setName( searchProgram.getName() );
			searchProgramsPerSearchDTO.setDisplayName( searchProgram.getDisplayName() );
			searchProgramsPerSearchDTO.setVersion( searchProgram.getVersion() );
			searchProgramsPerSearchDTO.setDescription( searchProgram.getDescription() );
			SearchProgramsPerSearchDAO.getInstance().save( searchProgramsPerSearchDTO );
			
			SearchProgramEntry searchProgramEntry = new SearchProgramEntry();
			searchProgramEntry.setSearchProgramsPerSearchDTO( searchProgramsPerSearchDTO );
			searchProgramEntryMap.put( searchProgramsPerSearchDTO.getName(), searchProgramEntry );
			processReportedPeptideAnnotationTypes( searchProgram, searchProgramEntry, searchProgramsPerSearchDTO.getId(), searchId, searchProgramInfo );
			processPsmAnnotationTypes( searchProgram, searchProgramEntry, searchProgramsPerSearchDTO.getId(), searchId, searchProgramInfo );
		}
		return searchProgramEntryMap;
	}
	
	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @throws Exception 
	 */
	private void processReportedPeptideAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {
		processFilterableReportedPeptideAnnotationTypes( searchProgram, searchProgramEntry, searchProgramId, searchId, searchProgramInfo );
		processDescriptiveReportedPeptideAnnotationTypes( searchProgram, searchProgramEntry, searchProgramId, searchId, searchProgramInfo );
		processMatchedProteinAnnotationTypes( searchProgram, searchProgramEntry, searchProgramId, searchId, searchProgramInfo );
	}
	
	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @throws Exception 
	 */
	private void processFilterableReportedPeptideAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {
		
		Map<String, AnnotationTypeDTO> reportedPeptideAnnotationTypeDTOMap = 
				searchProgramEntry.getReportedPeptideAnnotationTypeDTOMap();
		if ( reportedPeptideAnnotationTypeDTOMap == null ) {
			reportedPeptideAnnotationTypeDTOMap = new HashMap<>();
			searchProgramEntry.setReportedPeptideAnnotationTypeDTOMap( reportedPeptideAnnotationTypeDTOMap );
		}
		String searchProgramName = searchProgram.getName();
		List<SearchAnnotation> reportedPeptideAnnotationSortOrderSearchAnnotationList = null;
		List<SearchAnnotation> visibleReportedPeptideDefaultVisibleAnnotationsSearchAnnotationList = null;
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getAnnotationSortOrder() != null 
				&& searchProgramInfo.getAnnotationSortOrder().getReportedPeptideAnnotationSortOrder() != null 
				&& searchProgramInfo.getAnnotationSortOrder().getReportedPeptideAnnotationSortOrder().getSearchAnnotation() != null ) {
			reportedPeptideAnnotationSortOrderSearchAnnotationList = 
					searchProgramInfo.getAnnotationSortOrder().getReportedPeptideAnnotationSortOrder().getSearchAnnotation();
		}
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisibleReportedPeptideAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisibleReportedPeptideAnnotations().getSearchAnnotation() != null ) {
			visibleReportedPeptideDefaultVisibleAnnotationsSearchAnnotationList = 
					searchProgramInfo.getDefaultVisibleAnnotations().getVisibleReportedPeptideAnnotations().getSearchAnnotation();
		}
		SearchProgram.ReportedPeptideAnnotationTypes reportedPeptideAnnotationTypes =
				searchProgram.getReportedPeptideAnnotationTypes();
		if ( reportedPeptideAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Reported Peptide Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
			return;
		}
		FilterableReportedPeptideAnnotationTypes filterablePeptideAnnotationTypes =
				reportedPeptideAnnotationTypes.getFilterableReportedPeptideAnnotationTypes();
		if ( filterablePeptideAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Reported Peptide Filterable Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
			return;
		}
		List<FilterableReportedPeptideAnnotationType> filterablePeptideAnnotationTypeList =
				filterablePeptideAnnotationTypes.getFilterableReportedPeptideAnnotationType();
		if ( filterablePeptideAnnotationTypeList == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Reported Peptide Filterable Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
			return;
		}
		AnnotationTypeDAO annotationTypeDAO = AnnotationTypeDAO.getInstance();
		
		for ( FilterableReportedPeptideAnnotationType filterablePeptideAnnotationType : filterablePeptideAnnotationTypeList ) {
			String annotationTypeName = filterablePeptideAnnotationType.getName();
			Integer annotationTypeSortOrder = getAnnotationTypeSortOrder( annotationTypeName, searchProgramName, reportedPeptideAnnotationSortOrderSearchAnnotationList );
			boolean annotationTypeDefaultVisible = getAnnotationTypeDefaultVisible( annotationTypeName, searchProgramName, visibleReportedPeptideDefaultVisibleAnnotationsSearchAnnotationList );
			Integer annotationTypeDisplayOrder = getAnnotationTypeDisplayOrder( annotationTypeName, searchProgramName, visibleReportedPeptideDefaultVisibleAnnotationsSearchAnnotationList );
			AnnotationTypeDTO item = new AnnotationTypeDTO();
			item.setFilterableDescriptiveAnnotationType( FilterableDescriptiveAnnotationType.FILTERABLE );
			item.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.PEPTIDE );
			AnnotationTypeFilterableDTO annotationTypeFilterableDTO = new AnnotationTypeFilterableDTO();
			item.setAnnotationTypeFilterableDTO( annotationTypeFilterableDTO );
			item.setSearchId( searchId );
			item.setSearchProgramsPerSearchId( searchProgramId );
			item.setName( annotationTypeName );
			String filterDirectionString = filterablePeptideAnnotationType.getFilterDirection().value();
			FilterDirectionTypeJavaCodeEnum filterDirectionTypeJavaCodeEnum = FilterDirectionTypeJavaCodeEnum.fromValue(filterDirectionString);
			annotationTypeFilterableDTO.setFilterDirectionTypeJavaCodeEnum( filterDirectionTypeJavaCodeEnum );
			
			BigDecimal defaultFilterValue = filterablePeptideAnnotationType.getDefaultFilterValue();
			boolean isDefaultFilter = false;
			if ( defaultFilterValue != null ) {
				isDefaultFilter = true;
			}
			if ( isDefaultFilter ) {
				annotationTypeFilterableDTO.setDefaultFilter( isDefaultFilter );
				annotationTypeFilterableDTO.setDefaultFilterAtDatabaseLoad( isDefaultFilter );
				annotationTypeFilterableDTO.setDefaultFilterValue( defaultFilterValue.doubleValue() );
				annotationTypeFilterableDTO.setDefaultFilterValueString( defaultFilterValue.toString() );
				annotationTypeFilterableDTO.setDefaultFilterValueAtDatabaseLoad( defaultFilterValue.doubleValue() );
				annotationTypeFilterableDTO.setDefaultFilterValueStringAtDatabaseLoad( defaultFilterValue.toString() );
			}
			
			annotationTypeFilterableDTO.setSortOrder( annotationTypeSortOrder );
			item.setDefaultVisible( annotationTypeDefaultVisible );
			item.setDisplayOrder( annotationTypeDisplayOrder );
			item.setDescription( filterablePeptideAnnotationType.getDescription() );
			annotationTypeDAO.saveToDatabase( item );
			reportedPeptideAnnotationTypeDTOMap.put( item.getName(), item );
		}
	}
	
	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @param filterDirectionStringIdMap
	 * @throws Exception 
	 */
	private void processDescriptiveReportedPeptideAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {
		
		Map<String, AnnotationTypeDTO> reportedPeptideAnnotationTypeDTOMap = 
				searchProgramEntry.getReportedPeptideAnnotationTypeDTOMap();
		if ( reportedPeptideAnnotationTypeDTOMap == null ) {
			reportedPeptideAnnotationTypeDTOMap = new HashMap<>();
			searchProgramEntry.setReportedPeptideAnnotationTypeDTOMap( reportedPeptideAnnotationTypeDTOMap );
		}
		String searchProgramName = searchProgram.getName();
		List<SearchAnnotation> visibleReportedPeptideDefaultVisibleAnnotationsSearchAnnotationList = null;
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisibleReportedPeptideAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisibleReportedPeptideAnnotations().getSearchAnnotation() != null ) {
			visibleReportedPeptideDefaultVisibleAnnotationsSearchAnnotationList = 
					searchProgramInfo.getDefaultVisibleAnnotations().getVisibleReportedPeptideAnnotations().getSearchAnnotation();
		}
		SearchProgram.ReportedPeptideAnnotationTypes reportedPeptideAnnotationTypes =
				searchProgram.getReportedPeptideAnnotationTypes();
		if ( reportedPeptideAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Reported Peptide Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
			return;
		}
		DescriptiveReportedPeptideAnnotationTypes descriptivePeptideAnnotationTypes =
				reportedPeptideAnnotationTypes.getDescriptiveReportedPeptideAnnotationTypes();
		if ( descriptivePeptideAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Reported Peptide Descriptive Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
			return;
		}
		List<DescriptiveReportedPeptideAnnotationType> descriptivePeptideAnnotationTypeList =
				descriptivePeptideAnnotationTypes.getDescriptiveReportedPeptideAnnotationType();
		if ( descriptivePeptideAnnotationTypeList == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Reported Peptide Descriptive Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
			return;
		}
		
		AnnotationTypeDAO srchPgmDescriptiveReportedPeptideAnnotationTypeDAO = AnnotationTypeDAO.getInstance();
		
		for ( DescriptiveReportedPeptideAnnotationType descriptivePeptideAnnotationType : descriptivePeptideAnnotationTypeList ) {
			String annotationTypeName = descriptivePeptideAnnotationType.getName();
			boolean annotationTypeDefaultVisible = getAnnotationTypeDefaultVisible( annotationTypeName, searchProgramName, visibleReportedPeptideDefaultVisibleAnnotationsSearchAnnotationList );
			Integer annotationTypeDisplayOrder = getAnnotationTypeDisplayOrder( annotationTypeName, searchProgramName, visibleReportedPeptideDefaultVisibleAnnotationsSearchAnnotationList );
			AnnotationTypeDTO item = new AnnotationTypeDTO();
			item.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.PEPTIDE );
			item.setFilterableDescriptiveAnnotationType( FilterableDescriptiveAnnotationType.DESCRIPTIVE );
			item.setSearchId( searchId );
			item.setSearchProgramsPerSearchId( searchProgramId );
			item.setName( descriptivePeptideAnnotationType.getName() );
			item.setDefaultVisible(annotationTypeDefaultVisible);
			item.setDisplayOrder( annotationTypeDisplayOrder );
			item.setDescription( descriptivePeptideAnnotationType.getDescription() );
			srchPgmDescriptiveReportedPeptideAnnotationTypeDAO.saveToDatabase( item );
			reportedPeptideAnnotationTypeDTOMap.put( item.getName(), item );
		}
	}
	
	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @throws Exception 
	 */
	private void processPsmAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {
		processFilterablePsmAnnotationTypes( searchProgram, searchProgramEntry, searchProgramId, searchId, searchProgramInfo );
		processDescriptivePsmAnnotationTypes( searchProgram, searchProgramEntry, searchProgramId, searchId, searchProgramInfo );
	}
	
	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @param searchProgramInfo
	 * @throws Exception 
	 */
	private void processFilterablePsmAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {
	
		Map<String, AnnotationTypeDTO> psmAnnotationTypeDTOMap = 
				searchProgramEntry.getPsmAnnotationTypeDTOMap();
		if ( psmAnnotationTypeDTOMap == null ) {
			psmAnnotationTypeDTOMap = new HashMap<>();
			searchProgramEntry.setPsmAnnotationTypeDTOMap( psmAnnotationTypeDTOMap );
		}
		String searchProgramName = searchProgram.getName();
		List<SearchAnnotation> psmAnnotationSortOrderSearchAnnotationList = null;
		List<SearchAnnotation> visiblePsmDefaultVisibleAnnotationsSearchAnnotationList = null;
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getAnnotationSortOrder() != null 
				&& searchProgramInfo.getAnnotationSortOrder().getPsmAnnotationSortOrder() != null 
				&& searchProgramInfo.getAnnotationSortOrder().getPsmAnnotationSortOrder().getSearchAnnotation() != null ) {
			psmAnnotationSortOrderSearchAnnotationList = 
					searchProgramInfo.getAnnotationSortOrder().getPsmAnnotationSortOrder().getSearchAnnotation();
		}
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisiblePsmAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisiblePsmAnnotations().getSearchAnnotation() != null ) {
			visiblePsmDefaultVisibleAnnotationsSearchAnnotationList = 
					searchProgramInfo.getDefaultVisibleAnnotations().getVisiblePsmAnnotations().getSearchAnnotation();
		}
		SearchProgram.PsmAnnotationTypes psmAnnotationTypes =
				searchProgram.getPsmAnnotationTypes();
		if ( psmAnnotationTypes == null ) {
			//  No psm annotation types so exit 
			return; // EARLY EXIT
		}
		FilterablePsmAnnotationTypes filterablePsmAnnotationTypes =
				psmAnnotationTypes.getFilterablePsmAnnotationTypes();
		if ( filterablePsmAnnotationTypes == null ) {
			//  No filterable psm annotation types so exit 
			return;  //  EARLY EXIT
		}
		List<FilterablePsmAnnotationType> filterablePsmAnnotationTypeList =
				filterablePsmAnnotationTypes.getFilterablePsmAnnotationType();
		
		AnnotationTypeDAO srchPgmFilterablePsmAnnotationTypeDAO = AnnotationTypeDAO.getInstance();
		
		for ( FilterablePsmAnnotationType filterablePsmAnnotationType : filterablePsmAnnotationTypeList ) {
			String annotationTypeName = filterablePsmAnnotationType.getName();
			Integer annotationTypeSortOrder = getAnnotationTypeSortOrder( annotationTypeName, searchProgramName, psmAnnotationSortOrderSearchAnnotationList );
			boolean annotationTypeDefaultVisible = getAnnotationTypeDefaultVisible( annotationTypeName, searchProgramName, visiblePsmDefaultVisibleAnnotationsSearchAnnotationList );
			Integer annotationTypeDisplayOrder = getAnnotationTypeDisplayOrder( annotationTypeName, searchProgramName, visiblePsmDefaultVisibleAnnotationsSearchAnnotationList );
			AnnotationTypeDTO item = new AnnotationTypeDTO();
			AnnotationTypeFilterableDTO annotationTypeFilterableDTO = new AnnotationTypeFilterableDTO();
			item.setAnnotationTypeFilterableDTO( annotationTypeFilterableDTO );
			item.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.PSM );
			item.setFilterableDescriptiveAnnotationType( FilterableDescriptiveAnnotationType.FILTERABLE );
			item.setSearchId( searchId );
			item.setSearchProgramsPerSearchId( searchProgramId );
			item.setName( filterablePsmAnnotationType.getName() );
			String filterDirectionString = filterablePsmAnnotationType.getFilterDirection().value();
			FilterDirectionTypeJavaCodeEnum filterDirectionTypeJavaCodeEnum = FilterDirectionTypeJavaCodeEnum.fromValue( filterDirectionString );
			annotationTypeFilterableDTO.setFilterDirectionTypeJavaCodeEnum( filterDirectionTypeJavaCodeEnum );

			BigDecimal defaultFilterValue = filterablePsmAnnotationType.getDefaultFilterValue();
			boolean isDefaultFilter = false;
			if ( filterablePsmAnnotationType.getDefaultFilterValue() != null ) {
				isDefaultFilter = true;
			}
			annotationTypeFilterableDTO.setDefaultFilter( isDefaultFilter );
			annotationTypeFilterableDTO.setDefaultFilterAtDatabaseLoad( isDefaultFilter );
			if ( isDefaultFilter ) {
				annotationTypeFilterableDTO.setDefaultFilterValue( defaultFilterValue.doubleValue() );
				annotationTypeFilterableDTO.setDefaultFilterValueString( defaultFilterValue.toString() );
				annotationTypeFilterableDTO.setDefaultFilterValueAtDatabaseLoad( defaultFilterValue.doubleValue() );
				annotationTypeFilterableDTO.setDefaultFilterValueStringAtDatabaseLoad( defaultFilterValue.toString() );
			}
			
			annotationTypeFilterableDTO.setSortOrder( annotationTypeSortOrder );
			item.setDefaultVisible( annotationTypeDefaultVisible );
			item.setDisplayOrder( annotationTypeDisplayOrder );
			item.setDescription( filterablePsmAnnotationType.getDescription() );
			srchPgmFilterablePsmAnnotationTypeDAO.saveToDatabase( item );
			psmAnnotationTypeDTOMap.put( item.getName(), item );
		}
	}
	
	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @param filterDirectionStringIdMap
	 * @throws Exception 
	 */
	private void processDescriptivePsmAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {
		
		Map<String, AnnotationTypeDTO> psmAnnotationTypeDTOMap = 
				searchProgramEntry.getPsmAnnotationTypeDTOMap();
		if ( psmAnnotationTypeDTOMap == null ) {
			psmAnnotationTypeDTOMap = new HashMap<>();
			searchProgramEntry.setPsmAnnotationTypeDTOMap( psmAnnotationTypeDTOMap );
		}
		String searchProgramName = searchProgram.getName();
		List<SearchAnnotation> visiblePsmDefaultVisibleAnnotationsSearchAnnotationList = null;
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisiblePsmAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisiblePsmAnnotations().getSearchAnnotation() != null ) {
			visiblePsmDefaultVisibleAnnotationsSearchAnnotationList = 
					searchProgramInfo.getDefaultVisibleAnnotations().getVisiblePsmAnnotations().getSearchAnnotation();
		}
		SearchProgram.PsmAnnotationTypes psmAnnotationTypes = searchProgram.getPsmAnnotationTypes();
		if ( psmAnnotationTypes == null ) {
			//  No psmAnnotationTypes
			return; // EARLY EXIT
		}
		DescriptivePsmAnnotationTypes descriptivePsmAnnotationTypes = psmAnnotationTypes.getDescriptivePsmAnnotationTypes();
		if ( descriptivePsmAnnotationTypes == null ) {
			//  No descriptive annotation types so exit 
			return;  //  EARLY EXIT
		}

		AnnotationTypeDAO srchPgmDescriptivePsmAnnotationTypeDAO = AnnotationTypeDAO.getInstance();

		List<DescriptivePsmAnnotationType> descriptivePsmAnnotationTypeList = descriptivePsmAnnotationTypes.getDescriptivePsmAnnotationType();
		for ( DescriptivePsmAnnotationType descriptivePsmAnnotationType : descriptivePsmAnnotationTypeList ) {
			String annotationTypeName = descriptivePsmAnnotationType.getName();
			boolean annotationTypeDefaultVisible = getAnnotationTypeDefaultVisible( annotationTypeName, searchProgramName, visiblePsmDefaultVisibleAnnotationsSearchAnnotationList );
			Integer annotationTypeDisplayOrder = getAnnotationTypeDisplayOrder( annotationTypeName, searchProgramName, visiblePsmDefaultVisibleAnnotationsSearchAnnotationList );
			AnnotationTypeDTO item = new AnnotationTypeDTO();
			item.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.PSM );
			item.setFilterableDescriptiveAnnotationType( FilterableDescriptiveAnnotationType.DESCRIPTIVE );
			item.setSearchId( searchId );
			item.setSearchProgramsPerSearchId( searchProgramId );
			item.setName( descriptivePsmAnnotationType.getName() );
			item.setDefaultVisible( annotationTypeDefaultVisible );
			item.setDisplayOrder( annotationTypeDisplayOrder );
			item.setDescription( descriptivePsmAnnotationType.getDescription() );
			srchPgmDescriptivePsmAnnotationTypeDAO.saveToDatabase( item );
			psmAnnotationTypeDTOMap.put( item.getName(), item );
		}
	}
	

	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @throws Exception 
	 */
	private void processMatchedProteinAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {

		SearchProgram.MatchedProteinAnnotationTypes proteinAnnotationTypes =
				searchProgram.getMatchedProteinAnnotationTypes();
		
		if ( proteinAnnotationTypes == null ) {
			
			//  No Matched protein annotation types to process 
			
			return;  //  EARLY EXIT
		}
		
		processFilterableMatchedProteinAnnotationTypes( searchProgram, searchProgramEntry, searchProgramId, searchId, searchProgramInfo );
		processDescriptiveMatchedProteinAnnotationTypes( searchProgram, searchProgramEntry, searchProgramId, searchId, searchProgramInfo );
	}
	
	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @param searchProgramInfo
	 * @throws Exception 
	 */
	private void processFilterableMatchedProteinAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {
		
		SearchProgram.MatchedProteinAnnotationTypes matchedProteinAnnotationTypes =
				searchProgram.getMatchedProteinAnnotationTypes();
		if ( matchedProteinAnnotationTypes == null ) {
			//  tested for in calling method so throw IllegalArgumentException
			throw new IllegalArgumentException( "matchedProteinAnnotationTypes == null" );
		}
		
		Map<String, AnnotationTypeDTO> proteinAnnotationTypeDTOMap = 
				searchProgramEntry.getMatchedProteinAnnotationTypeDTOMap();
		if ( proteinAnnotationTypeDTOMap == null ) {
			proteinAnnotationTypeDTOMap = new HashMap<>();
			searchProgramEntry.setMatchedProteinAnnotationTypeDTOMap( proteinAnnotationTypeDTOMap );
		}
		String searchProgramName = searchProgram.getName();
		List<SearchAnnotation> proteinAnnotationSortOrderSearchAnnotationList = null;
		List<SearchAnnotation> visibleMatchedProteinDefaultVisibleAnnotationsSearchAnnotationList = null;
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getAnnotationSortOrder() != null 
				&& searchProgramInfo.getAnnotationSortOrder().getMatchedProteinAnnotationSortOrder() != null 
				&& searchProgramInfo.getAnnotationSortOrder().getMatchedProteinAnnotationSortOrder().getSearchAnnotation() != null ) {
			proteinAnnotationSortOrderSearchAnnotationList = 
					searchProgramInfo.getAnnotationSortOrder().getMatchedProteinAnnotationSortOrder().getSearchAnnotation();
		}
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisibleMatchedProteinAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisibleMatchedProteinAnnotations().getSearchAnnotation() != null ) {
			visibleMatchedProteinDefaultVisibleAnnotationsSearchAnnotationList = 
					searchProgramInfo.getDefaultVisibleAnnotations().getVisibleMatchedProteinAnnotations().getSearchAnnotation();
		}
	
		FilterableMatchedProteinAnnotationTypes filterableMatchedProteinAnnotationTypes =
				matchedProteinAnnotationTypes.getFilterableMatchedProteinAnnotationTypes();
		List<FilterableMatchedProteinAnnotationType> filterableMatchedProteinAnnotationTypeList =
				filterableMatchedProteinAnnotationTypes.getFilterableMatchedProteinAnnotationType();
		
		AnnotationTypeDAO srchPgmFilterableMatchedProteinAnnotationTypeDAO = AnnotationTypeDAO.getInstance();
		
		for ( FilterableMatchedProteinAnnotationType filterableMatchedProteinAnnotationType : filterableMatchedProteinAnnotationTypeList ) {
			String annotationTypeName = filterableMatchedProteinAnnotationType.getName();
			Integer annotationTypeSortOrder = getAnnotationTypeSortOrder( annotationTypeName, searchProgramName, proteinAnnotationSortOrderSearchAnnotationList );
			boolean annotationTypeDefaultVisible = getAnnotationTypeDefaultVisible( annotationTypeName, searchProgramName, visibleMatchedProteinDefaultVisibleAnnotationsSearchAnnotationList );
			Integer annotationTypeDisplayOrder = getAnnotationTypeDisplayOrder( annotationTypeName, searchProgramName, visibleMatchedProteinDefaultVisibleAnnotationsSearchAnnotationList );
			AnnotationTypeDTO item = new AnnotationTypeDTO();
			AnnotationTypeFilterableDTO annotationTypeFilterableDTO = new AnnotationTypeFilterableDTO();
			item.setAnnotationTypeFilterableDTO( annotationTypeFilterableDTO );
			item.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN );
			item.setFilterableDescriptiveAnnotationType( FilterableDescriptiveAnnotationType.FILTERABLE );
			item.setSearchId( searchId );
			item.setSearchProgramsPerSearchId( searchProgramId );
			item.setName( filterableMatchedProteinAnnotationType.getName() );
			String filterDirectionString = filterableMatchedProteinAnnotationType.getFilterDirection().value();
			FilterDirectionTypeJavaCodeEnum filterDirectionTypeJavaCodeEnum = FilterDirectionTypeJavaCodeEnum.fromValue( filterDirectionString );
			annotationTypeFilterableDTO.setFilterDirectionTypeJavaCodeEnum( filterDirectionTypeJavaCodeEnum );

			BigDecimal defaultFilterValue = filterableMatchedProteinAnnotationType.getDefaultFilterValue();
			boolean isDefaultFilter = false;
			if ( defaultFilterValue != null ) {
				isDefaultFilter = true;
			}
			if ( isDefaultFilter ) {
				annotationTypeFilterableDTO.setDefaultFilter( isDefaultFilter );
				annotationTypeFilterableDTO.setDefaultFilterAtDatabaseLoad( isDefaultFilter );
				annotationTypeFilterableDTO.setDefaultFilterValue( defaultFilterValue.doubleValue() );
				annotationTypeFilterableDTO.setDefaultFilterValueString( defaultFilterValue.toString() );
				annotationTypeFilterableDTO.setDefaultFilterValueAtDatabaseLoad( defaultFilterValue.doubleValue() );
				annotationTypeFilterableDTO.setDefaultFilterValueStringAtDatabaseLoad( defaultFilterValue.toString() );
			}
			annotationTypeFilterableDTO.setSortOrder( annotationTypeSortOrder );
			item.setDefaultVisible( annotationTypeDefaultVisible );
			item.setDisplayOrder( annotationTypeDisplayOrder );
			item.setDescription( filterableMatchedProteinAnnotationType.getDescription() );
			srchPgmFilterableMatchedProteinAnnotationTypeDAO.saveToDatabase( item );
			proteinAnnotationTypeDTOMap.put( item.getName(), item );
		}
	}
	
	/**
	 * @param searchProgram
	 * @param searchProgramEntry
	 * @param searchProgramId
	 * @param filterDirectionStringIdMap
	 * @throws Exception 
	 */
	private void processDescriptiveMatchedProteinAnnotationTypes( SearchProgram searchProgram, SearchProgramEntry searchProgramEntry, int searchProgramId, int searchId, SearchProgramInfo searchProgramInfo ) throws Exception {
		
		Map<String, AnnotationTypeDTO> proteinAnnotationTypeDTOMap = 
				searchProgramEntry.getMatchedProteinAnnotationTypeDTOMap();
		if ( proteinAnnotationTypeDTOMap == null ) {
			proteinAnnotationTypeDTOMap = new HashMap<>();
			searchProgramEntry.setMatchedProteinAnnotationTypeDTOMap( proteinAnnotationTypeDTOMap );
		}
		String searchProgramName = searchProgram.getName();
		List<SearchAnnotation> visibleMatchedProteinDefaultVisibleAnnotationsSearchAnnotationList = null;
		if ( searchProgramInfo != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisibleMatchedProteinAnnotations() != null 
				&& searchProgramInfo.getDefaultVisibleAnnotations().getVisibleMatchedProteinAnnotations().getSearchAnnotation() != null ) {
			visibleMatchedProteinDefaultVisibleAnnotationsSearchAnnotationList = 
					searchProgramInfo.getDefaultVisibleAnnotations().getVisibleMatchedProteinAnnotations().getSearchAnnotation();
		}
		SearchProgram.MatchedProteinAnnotationTypes proteinAnnotationTypes = searchProgram.getMatchedProteinAnnotationTypes();
		DescriptiveMatchedProteinAnnotationTypes descriptiveMatchedProteinAnnotationTypes = proteinAnnotationTypes.getDescriptiveMatchedProteinAnnotationTypes();
		if ( descriptiveMatchedProteinAnnotationTypes == null ) {
			//  No descriptive annotation types so exit 
			return;  //  EARLY EXIT
		}

		AnnotationTypeDAO srchPgmDescriptiveMatchedProteinAnnotationTypeDAO = AnnotationTypeDAO.getInstance();

		List<DescriptiveMatchedProteinAnnotationType> descriptiveMatchedProteinAnnotationTypeList = descriptiveMatchedProteinAnnotationTypes.getDescriptiveMatchedProteinAnnotationType();
		for ( DescriptiveMatchedProteinAnnotationType descriptiveMatchedProteinAnnotationType : descriptiveMatchedProteinAnnotationTypeList ) {
			String annotationTypeName = descriptiveMatchedProteinAnnotationType.getName();
			boolean annotationTypeDefaultVisible = getAnnotationTypeDefaultVisible( annotationTypeName, searchProgramName, visibleMatchedProteinDefaultVisibleAnnotationsSearchAnnotationList );
			Integer annotationTypeDisplayOrder = getAnnotationTypeDisplayOrder( annotationTypeName, searchProgramName, visibleMatchedProteinDefaultVisibleAnnotationsSearchAnnotationList );
			AnnotationTypeDTO item = new AnnotationTypeDTO();
			item.setPsmPeptideMatchedProteinAnnotationType( PsmPeptideMatchedProteinAnnotationType.PSM );
			item.setFilterableDescriptiveAnnotationType( FilterableDescriptiveAnnotationType.DESCRIPTIVE );
			item.setSearchId( searchId );
			item.setSearchProgramsPerSearchId( searchProgramId );
			item.setName( descriptiveMatchedProteinAnnotationType.getName() );
			item.setDefaultVisible( annotationTypeDefaultVisible );
			item.setDisplayOrder( annotationTypeDisplayOrder );
			item.setDescription( descriptiveMatchedProteinAnnotationType.getDescription() );
			srchPgmDescriptiveMatchedProteinAnnotationTypeDAO.saveToDatabase( item );
			proteinAnnotationTypeDTOMap.put( item.getName(), item );
		}
	}

	/**
	 * Utility Lookup.  Get position in AnnotationTypeSortOrder or return null if not found
	 * 
	 * 
	 * @param annotationTypeName
	 * @param searchProgramName
	 * @param annotationSortOrderSearchAnnotationList
	 * @return null if not found, otherwise the position in the list
	 */
	private Integer getAnnotationTypeSortOrder( String annotationTypeName, String searchProgramName, List<SearchAnnotation> annotationSortOrderSearchAnnotationList ) {
		
		if ( annotationSortOrderSearchAnnotationList == null ) {
			return null;
		}
		int orderPositionCounter = 0;
		for ( SearchAnnotation searchAnnotationSortOrder : annotationSortOrderSearchAnnotationList ) {
			orderPositionCounter++;
			if ( annotationTypeName.equals( searchAnnotationSortOrder.getAnnotationName() )
					&& searchProgramName.equals( searchAnnotationSortOrder.getSearchProgram() ) ) {
				return orderPositionCounter;  // EARLY EXIT
			}
		}
		return null;  //  for no match found
	}
	
	/**
	 * Utility Lookup.  Return true if in AnnotationTypeDefaultVisible or return false if not found
	 * 
	 * @param annotationTypeName
	 * @param searchProgramName
	 * @param annotationDefaultVisibleSearchAnnotationList
	 * @return Return true if in AnnotationTypeDefaultVisible or return false if not found
	 */
	private boolean getAnnotationTypeDefaultVisible( String annotationTypeName, String searchProgramName, List<SearchAnnotation> annotationDefaultVisibleSearchAnnotationList ) {

		if ( annotationDefaultVisibleSearchAnnotationList == null ) {
			return false;
		}
		for ( SearchAnnotation searchAnnotationDefaultVisible : annotationDefaultVisibleSearchAnnotationList ) {
			if ( annotationTypeName.equals( searchAnnotationDefaultVisible.getAnnotationName() )
					&& searchProgramName.equals( searchAnnotationDefaultVisible.getSearchProgram() ) ) {
				return true;  // EARLY EXIT
			}
		}
		return false;  //  for no match found
	}
	
	/**
	 * Utility Lookup.  Get position in AnnotationTypeDefaultVisible or return null if not found
	 * 
	 * 
	 * @param annotationTypeName
	 * @param searchProgramName
	 * @param annotationSortOrderSearchAnnotationList
	 * @return null if not found, otherwise the position in the list
	 */
	private Integer getAnnotationTypeDisplayOrder( String annotationTypeName, String searchProgramName, List<SearchAnnotation> annotationDefaultVisibleSearchAnnotationList ) {
		
		if ( annotationDefaultVisibleSearchAnnotationList == null ) {
			return null;
		}
		int orderPositionCounter = 0;
		for ( SearchAnnotation searchAnnotationDefaultVisible : annotationDefaultVisibleSearchAnnotationList ) {
			orderPositionCounter++;
			if ( annotationTypeName.equals( searchAnnotationDefaultVisible.getAnnotationName() )
					&& searchProgramName.equals( searchAnnotationDefaultVisible.getSearchProgram() ) ) {
				return orderPositionCounter;  // EARLY EXIT
			}
		}
		return null;  //  for no match found
	}
}
