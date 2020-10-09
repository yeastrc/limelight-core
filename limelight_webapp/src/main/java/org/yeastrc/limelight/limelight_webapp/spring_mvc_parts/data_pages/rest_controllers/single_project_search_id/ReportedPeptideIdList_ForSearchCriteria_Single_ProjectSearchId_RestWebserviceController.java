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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.single_project_search_id;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_request_objects.controller_request_root.ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RequestRoot;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_response_parts.ReportedPeptideItemForReportedPeptideIdList_SingleProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Webservice
 * 
 * Input: Project Search Id and Cutoffs
 * 
 * Output List:  Entry:  Reported Peptide Id,  Number of PSMs (If already available since default cutoffs, else null)
 * 
 *             Need to validate Project Search ID values in URL with values in POST JSON
 *               Already done for Ann Type Cutoffs in called code that translates cutoffs to objects sent to searcher
 *
 */
@RestController
public class ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RestWebserviceController.class );

	/**
	 * Path for this Controller
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.REPORTED_PEPTIDE_LIST_REPORTED_PEPTIDE_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER;
	
	/**
	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
	 */
	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );

	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
	
	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	
	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ CONTROLLER_PATH
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "webserviceMethod(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
    		
    		if ( postBody == null || postBody.length == 0 ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RequestRoot webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, ReportedPeptideIdList_ForSearchCriteria_Single_ProjectSearchId_RequestRoot.class );

    		SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId = webserviceRequest.getSearchDataLookupParams_For_Single_ProjectSearchId();

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
    		projectSearchIdsForValidate.add( projectSearchId );

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );
    		
    		////////////////

    		{ // Return cached value if available
    			
    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
    			
    			if ( cachedResponse != null ) {
    				
    				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( cachedResponse );
    			}
    		}
    		
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		
       		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
   			projectSearchIdMapToSearchId.put( projectSearchId, searchId );
   			
   			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
    				searcherCutoffValuesRootLevel_Factory
    				.createSearcherCutoffValuesSearchLevel( projectSearchIdMapToSearchId, searchDataLookupParams_For_Single_ProjectSearchId );

   			
   			final int minimumNumberOfPSMsPerReportedPeptide = 1; // standard minimum # PSMs 
   			
			//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria
   			
    		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
    				reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );

    		//  Final output Peptide List
    		List<ReportedPeptideItemForReportedPeptideIdList_SingleProjectSearchId> peptideResultListResult = new ArrayList<>( peptideMinimalObjectsList.size() );

    		for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry entry : peptideMinimalObjectsList ) {

    			//  Build Entry for output list
    			ReportedPeptideItemForReportedPeptideIdList_SingleProjectSearchId reportedPeptideItemForProjectSearch = new ReportedPeptideItemForReportedPeptideIdList_SingleProjectSearchId();
    			reportedPeptideItemForProjectSearch.setReportedPeptideId( entry.getReportedPeptideId() );
    			
    			Integer numPsms = entry.getNumPsms_IfComputedOrInDB();
    			reportedPeptideItemForProjectSearch.setNumPsms_IfComputedOrInDB( numPsms );
    			
    			boolean reportedPeptideHas_DynamicModifications = entry.isReportedPeptideHas_DynamicModifications();
    			reportedPeptideItemForProjectSearch.setReportedPeptideHas_DynamicModifications( reportedPeptideHas_DynamicModifications );

    			boolean anyPsmHas_DynamicModifications = entry.isAnyPsmHas_DynamicModifications();
    			reportedPeptideItemForProjectSearch.setAnyPsmHas_DynamicModifications( anyPsmHas_DynamicModifications );
    			
    			boolean anyPsmHas_OpenModifications = entry.isAnyPsmHas_OpenModifications();
    			reportedPeptideItemForProjectSearch.setAnyPsmHas_OpenModifications( anyPsmHas_OpenModifications );
    			
    			boolean anyPsmHas_ReporterIons = entry.isAnyPsmHas_ReporterIons();
    			reportedPeptideItemForProjectSearch.setAnyPsmHas_ReporterIons( anyPsmHas_ReporterIons );
    			
    			peptideResultListResult.add( reportedPeptideItemForProjectSearch );
    		}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.searchId = searchId;
    		webserviceResult.reportedPeptideList = peptideResultListResult;

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		{ // Save cached value 
    			
    			cached_WebserviceResponse_Management.putCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON, this );
    		}
    		
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	private List<ReportedPeptideItemForReportedPeptideIdList_SingleProjectSearchId> reportedPeptideList;
    	
    	private Integer searchId;

		public List<ReportedPeptideItemForReportedPeptideIdList_SingleProjectSearchId> getReportedPeptideList() {
			return reportedPeptideList;
		}
		public void setReportedPeptideList(
				List<ReportedPeptideItemForReportedPeptideIdList_SingleProjectSearchId> reportedPeptideList) {
			this.reportedPeptideList = reportedPeptideList;
		}
		public Integer getSearchId() {
			return searchId;
		}
		public void setSearchId(Integer searchId) {
			this.searchId = searchId;
		}
    }

}


