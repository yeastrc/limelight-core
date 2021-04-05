/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectPageSingleFolder;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.constants.SearchDataLookupParams_VersionNumber;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_MainProcessingIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_MainProcessing.SearchDataLookupParams_MainProcessing_Result;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.web_utils.ViewProjectSearchesInFoldersIF;
import org.yeastrc.limelight.limelight_webapp.web_utils.ViewProjectSearchesInFolders.ProjectPageFoldersSearches;

/**
 * 
 *
 */

@Service
public class SearchDataLookupParametersLookupCode__Create_InsertToDB__Service implements SearchDataLookupParametersLookupCode__Create_InsertToDB__Service_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParametersLookupCode__Create_InsertToDB__Service.class );

	@Autowired
	private ViewProjectSearchesInFoldersIF viewProjectSearchesInFolders;
	
	@Autowired
	private SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF searchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds;

	@Autowired
	private SearchDataLookupParams_MainProcessingIF searchDataLookupParams_MainProcessing;
	
	/**
	 *
	 */
	public static class SearchDataLookupParametersLookupCode__Create_InsertToDB__Service__Result {

    	private SearchDataLookupParamsRoot searchDataLookupParamsRoot;
    	private String searchDataLookupParamsCode;
    	private SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO;
    	
		public SearchDataLookupParamsRoot getSearchDataLookupParamsRoot() {
			return searchDataLookupParamsRoot;
		}
		public void setSearchDataLookupParamsRoot(SearchDataLookupParamsRoot searchDataLookupParamsRoot) {
			this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
		}
		public String getSearchDataLookupParamsCode() {
			return searchDataLookupParamsCode;
		}
		public void setSearchDataLookupParamsCode(String searchDataLookupParamsCode) {
			this.searchDataLookupParamsCode = searchDataLookupParamsCode;
		}
		public SearchDataLookupParametersLookupDTO getSearchDataLookupParametersLookupDTO() {
			return searchDataLookupParametersLookupDTO;
		}
		public void setSearchDataLookupParametersLookupDTO(
				SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO) {
			this.searchDataLookupParametersLookupDTO = searchDataLookupParametersLookupDTO;
		}
	
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.SearchDataLookupParametersLookupCode__Create_InsertToDB__Service_IF#searchDataLookupParametersLookupCode__Create_InsertToDB__Service(java.lang.Integer, org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot, java.util.List, org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo)
	 */
	@Override
	public SearchDataLookupParametersLookupCode__Create_InsertToDB__Service__Result searchDataLookupParametersLookupCode__Create_InsertToDB__Service(
			
			Integer projectId,
			SearchDataLookupParamsRoot searchDataLookupParamsRoot_FromRequest,
	    	List<Integer> projectSearchIds_CreateDefault,
	    	SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo
			) throws Exception {
		

		SearchDataLookupParamsRoot newSearchDataLookupParamsRoot = null;
		String searchDataLookupParamsCode = null;
		SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO = null;

		if ( projectSearchIds_CreateDefault != null && ( ! projectSearchIds_CreateDefault.isEmpty() ) ) {
			
			if ( searchDataLookupParamsRoot_FromRequest != null ) {
				
				//  Adding to existing SearchDataLookupParamsRoot so Version must match

    			Integer versionNumber = searchDataLookupParamsRoot_FromRequest.getVersionNumber();
    			
    			if ( versionNumber == null ) {
    				throw new LimelightErrorDataInWebRequestException( "No Version Number" );
    			}
    			if ( versionNumber != SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER ) {
    				throw new LimelightErrorDataInWebRequestException( "Version Number Not Match Current. versionNumber: " 
    						+ versionNumber + ", Current: " + SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER );
    			}
			}
			
			//  Put ProjectSearchIds_CreateDefault in same order as displayed on Project Page
			
			List<Integer> projectSearchIds_CreateDefault_InOrder = new ArrayList<>( projectSearchIds_CreateDefault.size() );
			

//			if ( searchDataLookupParamsRoot != null ) {
//				
//				//  Also have SearchDataLookupParamsRoot so just copy in array provided
//				
//				projectSearchIds_CreateDefault_InOrder.addAll( projectSearchIds_CreateDefault );
//			
//			} else {
				
				//  No SearchDataLookupParamsRoot so set order based on order on project page
    				
    			if ( projectSearchIds_CreateDefault.size() == 1 ) {
    				//  Only 1 entry so no need to put it in order
    				
    				projectSearchIds_CreateDefault_InOrder.add( projectSearchIds_CreateDefault.get( 0 ) );
    			
    			} else {
    				// > 1 entry so get searches i order of project page
    			
    				Set<Integer> projectSearchIds_CreateDefault_Set = new HashSet<>( projectSearchIds_CreateDefault );

    				//  Get the searches and put them in folders
    				ProjectPageFoldersSearches projectPageFoldersSearches = 
    						viewProjectSearchesInFolders.getProjectPageFoldersSearches( projectId );
    				
    				
    				if (  projectPageFoldersSearches.getFolders() != null ) {
    					
    					for ( ProjectPageSingleFolder folder : projectPageFoldersSearches.getFolders() ) {
    						
    						if ( folder.getSearches() != null ) {
    							for ( SearchItemMinimal search : folder.getSearches() ) {
    								Integer projectSearchId_Of_Search = search.getProjectSearchId();
    								if ( projectSearchIds_CreateDefault_Set.contains( projectSearchId_Of_Search ) ) {
    									
    									projectSearchIds_CreateDefault_InOrder.add(projectSearchId_Of_Search);
    									projectSearchIds_CreateDefault_Set.remove(projectSearchId_Of_Search);
    								}
    							}
    						}
    					}
    				}
    				
    				if ( projectPageFoldersSearches.getSearchesNotInFolders() != null ) {
    					for ( SearchItemMinimal search : projectPageFoldersSearches.getSearchesNotInFolders() ) {
							Integer projectSearchId_Of_Search = search.getProjectSearchId();
							if ( projectSearchIds_CreateDefault_Set.contains( projectSearchId_Of_Search ) ) {
								
								projectSearchIds_CreateDefault_InOrder.add(projectSearchId_Of_Search);
								projectSearchIds_CreateDefault_Set.remove(projectSearchId_Of_Search);
							}
						}
    				}
    				
    				if ( ! projectSearchIds_CreateDefault_Set.isEmpty() ) {
    					log.warn( "The following Project Search Ids are in projectSearchIds_CreateDefault but not in projectPageFoldersSearches:"
    							+ projectSearchIds_CreateDefault_Set );
    					
    					List<Integer> projectSearchIds_CreateDefault_Leftovers = new ArrayList<>( projectSearchIds_CreateDefault_Set );
    					Collections.sort( projectSearchIds_CreateDefault_Leftovers );
    					projectSearchIds_CreateDefault_InOrder.addAll(projectSearchIds_CreateDefault_Leftovers);
    				}
//    			}
			}
			
			
			        		
			SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds_Result result = 
			searchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds
			.create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds(
					projectId, 
					projectSearchIds_CreateDefault_InOrder,
					searchDataLookupParams_CreatedByInfo, 
					null /* projectSearchIdsToSearchIds */, searchDataLookupParamsRoot_FromRequest );

			searchDataLookupParamsCode = result.getSearchDataLookupParamsCode();
			newSearchDataLookupParamsRoot = result.getSearchDataLookupParamsRoot();
			searchDataLookupParametersLookupDTO = result.getSearchDataLookupParametersLookupDTO();
		
		} else if ( searchDataLookupParamsRoot_FromRequest != null ) {
			
			newSearchDataLookupParamsRoot = searchDataLookupParamsRoot_FromRequest;

			//  Save and create code
			
			SearchDataLookupParams_MainProcessing_Result searchDataLookupParams_MainProcessing_Result =
					searchDataLookupParams_MainProcessing
					.searchDataLookupParams_Save_Create_Code( 
							searchDataLookupParamsRoot_FromRequest, 
							SearchDataLookupParametersLookupRootIdTypes.PROJECT_SEARCH_IDS, 
							null, // singleProjectSearchIdCreatedDefaultsFor, 
							searchDataLookupParams_CreatedByInfo );
			
			searchDataLookupParamsCode = searchDataLookupParams_MainProcessing_Result.getSearchDataLookupParamsCode();
			searchDataLookupParametersLookupDTO = searchDataLookupParams_MainProcessing_Result.getSearchDataLookupParametersLookupDTO();

		}
		
		SearchDataLookupParametersLookupCode__Create_InsertToDB__Service__Result result = new SearchDataLookupParametersLookupCode__Create_InsertToDB__Service__Result();
		
		result.searchDataLookupParamsCode = searchDataLookupParamsCode;
		result.searchDataLookupParamsRoot = newSearchDataLookupParamsRoot;
		result.searchDataLookupParametersLookupDTO = searchDataLookupParametersLookupDTO;

		return result;
	}
}
