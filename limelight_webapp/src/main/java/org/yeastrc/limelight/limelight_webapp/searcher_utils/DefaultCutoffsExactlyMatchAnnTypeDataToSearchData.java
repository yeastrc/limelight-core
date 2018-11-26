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
package org.yeastrc.limelight.limelight_webapp.searcher_utils;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.annotation_type_utils.GetAnnotationTypeDataIF;
import org.yeastrc.limelight.limelight_webapp.annotation_type_utils.GetAnnotationTypeData.GetAnnotationTypeDataResult;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 * 
 * Can the counts in the table for at the default default cutoff be used
 * for the set of cutoffs provided.
 * 
 * The answer is yes if and only if exactly only and all the annotation types with a default cutoff 
 * are present in the list of cutoffs passed in 
 * and the cutoffs passed in match the default cutoffs for the annotation types
 * 
 * Any annotation type records where annotation_type_filterable.default_filter_value_at_database_load = null and annotation_type_filterable.default_filter_at_database_load = 1
 *   will cause a return value of false.  Those records are only allowed when the config properties file contains a special entry.  see code below. 
 */
@Component
public class DefaultCutoffsExactlyMatchAnnTypeDataToSearchData implements DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataIF {

	private static final Logger log = LoggerFactory.getLogger( DefaultCutoffsExactlyMatchAnnTypeDataToSearchData.class );
	
	@Autowired
	private GetAnnotationTypeDataIF getAnnotationTypeData;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searcher_utils.DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataIF#defaultCutoffsExactlyMatchAnnTypeDataToSearchData(int, org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult defaultCutoffsExactlyMatchAnnTypeDataToSearchData( 
			int searchId, 
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {
		
		DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult result = new DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult();
		
		boolean defaultCutoffsExactlyMatchAnnTypeDataToSearchData = true;
		
		List<SearcherCutoffValuesAnnotationLevel> peptideCutoffValuesList = 
				searcherCutoffValuesSearchLevel.getPeptidePerAnnotationCutoffsList();
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList = 
				searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList();
		
		//  Get Filterable Annotation Type records for Reported Peptides and PSMs
		GetAnnotationTypeDataResult getAnnotationTypeDataResult = getAnnotationTypeData.getAnnotationTypeDataForSearchId( searchId );  
		

		//  TODO  Not currently support Matched Protein Cutoffs
		
		if ( getAnnotationTypeDataResult.getMatchedProteinFilterableAnnotationTypeData() != null 
				&& ( ! getAnnotationTypeDataResult.getMatchedProteinFilterableAnnotationTypeData().isEmpty() ) ) {
			
//			log.error( "WARNING: MatchedProteinFilterableAnnotationTypeData is not empty.  Will NOT consider MatchedProteinFilterableAnnotationTypeData when determining if cutoffs are default cutoffs" );
			
			String msg = "Matched Protein Annotation Type data not supported";
			log.error( msg );
			throw new LimelightInternalErrorException();
		}
		
		//  Test Peptide Cutoffs
		if ( ! processPeptideOrPSM( peptideCutoffValuesList,  getAnnotationTypeDataResult.getReportedPeptideFilterableAnnotationTypeData() ) ) {
			defaultCutoffsExactlyMatchAnnTypeDataToSearchData = false;
		}
		//  Test PSM Cutoffs
		if ( ! processPeptideOrPSM( psmCutoffValuesList,  getAnnotationTypeDataResult.getPsmFilterableAnnotationTypeData() ) ) {
			defaultCutoffsExactlyMatchAnnTypeDataToSearchData = false;
		}
		result.defaultCutoffsExactlyMatchAnnTypeDataToSearchData = defaultCutoffsExactlyMatchAnnTypeDataToSearchData;
		return result;
	}
	
	/**
	 * @param cutoffValuesList
	 * @param filterableAnnotationTypesForSearchId
	 * @return
	 * @throws LimelightInternalErrorException
	 * @throws LimelightErrorDataInWebRequestException 
	 */
	private boolean processPeptideOrPSM( 
			List<SearcherCutoffValuesAnnotationLevel> cutoffValuesList, 
			Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesForSearchId ) throws LimelightInternalErrorException, LimelightErrorDataInWebRequestException {
		
		Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesWithDefaultValues = getFilterableAnnTypesWithDefaultValues( filterableAnnotationTypesForSearchId );
		if ( cutoffValuesList == null || cutoffValuesList.isEmpty() ) {
			//  No cutoffs so must not be any default cutoffs in annotation types
			if ( filterableAnnotationTypesWithDefaultValues == null || filterableAnnotationTypesWithDefaultValues.isEmpty() ) {
				//  Also no annotation type records with defaults so return true
				return true; //  EARLY EXIT
			}
			//  Found at least one default filter but no cutoff provided for it so return false;
			return false; //  EARLY EXIT
		}
		//  Process the cutoffs, ensure that ALL are default and all default in Annotation types is in the cutoffs
		for ( SearcherCutoffValuesAnnotationLevel searcherCutoffValuesAnnotationLevel : cutoffValuesList ) {
			Integer annotationTypeId_In_searcherCutoffValuesAnnotationLevel = searcherCutoffValuesAnnotationLevel.getAnnotationTypeId();
			//  Safe to do .remove(...) since this is a copy Map
			AnnotationTypeDTO annotationTypeDTOWithDefaultValue = filterableAnnotationTypesWithDefaultValues.remove( annotationTypeId_In_searcherCutoffValuesAnnotationLevel );
			if ( annotationTypeDTOWithDefaultValue == null ) { 
				// Cutoff is not in default list so return false;
				return false; //  EARLY EXIT
			} else {
				// Have ann type with default so make comparison
				if ( annotationTypeDTOWithDefaultValue.getAnnotationTypeFilterableDTO().getDefaultFilterValueAtDatabaseLoad() == null ) {
					// Found a default ann type and the default value on database load is null so cannot match user input cutoff
					//       (This property being null at this point is not normal database value)
					//    annotation_type_filterable.default_filter_value_at_database_load = null and annotation_type_filterable.default_filter_at_database_load = 1
					
					//  TODO !!!!!  Config entry to AllowAnnTypeFilterDefaultFilterValueAtDatabaseLoad_Null_When_isDefaultFilter_True
					//     This is used when re-computing the values at default cutoffs to temp force Webapp to ignore default cutoffs
//					if ( LimelightConfigFileValues.getInstance()
//							.isAllowAnnTypeFilterDefaultFilterValueAtDatabaseLoad_Null_When_isDefaultFilter_True() ) {
//						
//						// Configuration allows null value
//						return false; //  EARLY EXIT
//					}
					{
						String msg = "Data in DB is invalid. getDefaultFilterValueAtDatabaseLoad() == null when isDefaultFilter() is true."
								+ " annotation_type_filterable.default_filter_value_at_database_load = null and annotation_type_filterable.default_filter_at_database_load = 1. "
								+ " annotation type id: " + annotationTypeDTOWithDefaultValue.getId();
						log.error( msg );
						throw new LimelightErrorDataInWebRequestException( msg );
					}
				}
				if ( annotationTypeDTOWithDefaultValue.getAnnotationTypeFilterableDTO().getDefaultFilterValueAtDatabaseLoad().doubleValue() 
						!= searcherCutoffValuesAnnotationLevel.getAnnotationCutoffValue() ) {
					// Found a default ann type and the default values don't match
					return false; //  EARLY EXIT
				}
			}
		}
		if ( ! filterableAnnotationTypesWithDefaultValues.isEmpty() ) {
			//  There is at least one default filter and no cutoff provided for it so return false;
			return false; //  EARLY EXIT
		}
		return true;
	}
	
	/**
	 * @param filterableAnnotationTypesForSearchId
	 * @return
	 * @throws LimelightInternalErrorException
	 */
	private Map<Integer, AnnotationTypeDTO> getFilterableAnnTypesWithDefaultValues( Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesForSearchId ) throws LimelightInternalErrorException {
		if ( filterableAnnotationTypesForSearchId == null || filterableAnnotationTypesForSearchId.isEmpty() ) {
			return null;
		}
		Map<Integer, AnnotationTypeDTO> filterableAnnotationTypesWithDefaultValues = new HashMap<>();
		for ( Map.Entry<Integer, AnnotationTypeDTO> entry : filterableAnnotationTypesForSearchId.entrySet() ) {
			AnnotationTypeDTO annotationTypeDTO = entry.getValue();
			if ( annotationTypeDTO.getAnnotationTypeFilterableDTO() == null ) {
				String msg = "annotationTypeDTO.getAnnotationTypeFilterableDTO() == null on a Filterable annotation type, ann type id:"
						+ annotationTypeDTO.getId();
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			if ( annotationTypeDTO.getAnnotationTypeFilterableDTO().isDefaultFilter() ) {
				//  Found default filter 
				filterableAnnotationTypesWithDefaultValues.put( entry.getKey(), entry.getValue() );
			}
		}
		return filterableAnnotationTypesWithDefaultValues;
	}
	
	/**
	 * Result object
	 *
	 */
	public static class DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult {
		private boolean defaultCutoffsExactlyMatchAnnTypeDataToSearchData;
		public boolean isDefaultCutoffsExactlyMatchAnnTypeDataToSearchData() {
			return defaultCutoffsExactlyMatchAnnTypeDataToSearchData;
		}
		public void setDefaultCutoffsExactlyMatchAnnTypeDataToSearchData(boolean defaultCutoffsExactlyMatchAnnTypeDataToSearchData) {
			this.defaultCutoffsExactlyMatchAnnTypeDataToSearchData = defaultCutoffsExactlyMatchAnnTypeDataToSearchData;
		}
	}

}
