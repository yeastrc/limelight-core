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
package org.yeastrc.limelight.limelight_webapp.experiment.main;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.Validate_Access_Page_ExperimentDataPage.Validate_Access_Page_ExperimentDataPage_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIds_For_ProjectSearchIdList_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIds_For_ProjectSearchIdList_Searcher.SearchIdForProjectSearchIdListSearcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;

/**
 * Set HTTPRequest values for rendering in JSP
 *
 */
@Component
public class Experiment_Set_HTTPRequest_ForJSP implements Experiment_Set_HTTPRequest_ForJSP_IF {
	
	private static final Logger log = LoggerFactory.getLogger( Experiment_Set_HTTPRequest_ForJSP.class );

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;

	@Autowired
	private SearchIds_For_ProjectSearchIdList_Searcher_IF searchIds_For_ProjectSearchIdList_Searcher;
	
	@Autowired
	private SearchFlagsForSearchIdSearcherIF searchFlagsForSearchIdSearcher;

	/**
	 * @param projectIds
	 * @param userSession
	 * @param httpServletRequest
	 * @throws Exception 
	 */
	@Override
	public void experiment_Set_HTTPRequest_ForJSP( Validate_Access_Page_ExperimentDataPage_Result validate_Access_Page_ExperimentDataPage_Result, HttpServletRequest httpServletRequest ) throws Exception {

		populatePageHeaderData.populatePageHeaderData( validate_Access_Page_ExperimentDataPage_Result.getProjectIds(), validate_Access_Page_ExperimentDataPage_Result.getUserSession(), httpServletRequest );

		WebSessionAuthAccessLevel webSessionAuthAccessLevel = validate_Access_Page_ExperimentDataPage_Result.getWebSessionAuthAccessLevel();
		
		ExperimentDTO experimentDTO = validate_Access_Page_ExperimentDataPage_Result.getExperimentDTO();
		
		String experimentJSONMainData = experimentDTO.getExperimentJSONMainData();

		SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO = validate_Access_Page_ExperimentDataPage_Result.getSearchDataLookupParametersLookupDTO();
		String searchDataLookupParametersLookupJSON =
				searchDataLookupParametersLookupDTO.getLookupParametersJSONMainData();

		httpServletRequest.setAttribute( WebConstants.REQUEST_WEB_SESSION_AUTH_ACCESS_LEVEL, webSessionAuthAccessLevel );
		
		
		String experimentIdString = String.valueOf( experimentDTO.getId() );

		httpServletRequest.setAttribute( 
				WebConstants.REQUEST_EXPERIMENT_ID_STRING, experimentIdString );
		
		httpServletRequest.setAttribute( 
				WebConstants.REQUEST_EXPERIMENT_NAME, experimentDTO.getName() );

		httpServletRequest.setAttribute( 
				WebConstants.REQUEST_EXPERIMENT_DATA_MAIN_JSON, experimentJSONMainData );
		
		httpServletRequest.setAttribute( 
				WebConstants.REQUEST_EXPERIMENT_PROJECT_SEARCH_IDS_JSON, experimentDTO.getProjectSearchIdsOnlyJSON() );
		
		
		httpServletRequest.setAttribute( 
				WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_CODE, validate_Access_Page_ExperimentDataPage_Result.getSearchDataLookupParametersCode() );
		
		httpServletRequest.setAttribute( 
				WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_JSON, searchDataLookupParametersLookupJSON );

		httpServletRequest.setAttribute( 
				WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_ROOT_IDS_JSON, searchDataLookupParametersLookupDTO.getRootIdsOnlyJSON() );
		
		{
			List<Integer> projectSearchIdList = new ArrayList<>( validate_Access_Page_ExperimentDataPage_Result.getProjectSearchIds_In_Experiment().length );
			for ( int projectSearchId : validate_Access_Page_ExperimentDataPage_Result.getProjectSearchIds_In_Experiment() ) {
				projectSearchIdList.add( projectSearchId );
			}


			List<SearchIdForProjectSearchIdListSearcher_ResultItem> searchIds_For_ProjectSearchIdList_ResultList = 
			searchIds_For_ProjectSearchIdList_Searcher.get_SearchIds_For_ProjectSearchIdList(projectSearchIdList);

			List<Integer> searchIds = new ArrayList<>( projectSearchIdList.size() );

			{
				Set<Integer> projectSearchId_Set_Delete_ToValidateAllFound = new HashSet<>( projectSearchIdList );

				for ( SearchIdForProjectSearchIdListSearcher_ResultItem searchIds_ResultItem : searchIds_For_ProjectSearchIdList_ResultList ) {

					searchIds.add( searchIds_ResultItem.getSearchId() );
					
					if ( ! projectSearchId_Set_Delete_ToValidateAllFound.remove( searchIds_ResultItem.getProjectSearchId() ) ) {
						String msg = "NO Search ID Found for Project Search Id: " + searchIds_ResultItem.getProjectSearchId();
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}
				}
			}

			SearchFlagsForSearchIdSearcher_Result searchFlagsForSearchIdSearcher_Result =
					searchFlagsForSearchIdSearcher.getSearchFlags_ForSearchIds(searchIds);

			boolean all_Searches_HaveProteins = true;
			boolean all_Searches_NOT_HaveProteins = true;

			for ( SearchFlagsForSearchIdSearcher_Result_Item flagItem : searchFlagsForSearchIdSearcher_Result.getResultItems() ) {

				if ( flagItem.isSearchNotContainProteins() ) {
					all_Searches_HaveProteins = false;
				} else {
					all_Searches_NOT_HaveProteins = false;
				}
			}


			httpServletRequest.setAttribute( WebConstants.REQUEST_SEARCHES_ALL_CONTAIN_PROTEINS, all_Searches_HaveProteins );
			httpServletRequest.setAttribute( WebConstants.REQUEST_SEARCHES_ALL_NOT_CONTAIN_PROTEINS, all_Searches_NOT_HaveProteins );
		}
	}
	
}
