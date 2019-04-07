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
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Get Reported Peptide Strings from Reported Peptide Ids.  
 * 
 * Project Search Ids required for access control.
 * 
 * Only Reported Peptide Ids for those Project Search Ids will be returned.
 * 
 * A boolean in the response indicates if all Reported Peptide Ids were found
 * 
 * Returns List<>
 */
@RestController
public class ReportedPeptideStringList_From_ReportedPeptideIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ReportedPeptideStringList_From_ReportedPeptideIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
		
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_SearcherIF reportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
    /**
	 * 
	 */
	public ReportedPeptideStringList_From_ReportedPeptideIds_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
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
					+ AA_RestWSControllerPaths_Constants.REPORTED_PEPTIDE_STRINGS_FOR_REPORTED_PEPTIDES_ID_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "controllerEntry(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		List<Integer> projectSearchIds = webserviceRequest.getProjectSearchIds();
    		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIds, httpServletRequest );
    		
    		////////////////
   		
    		    		
    		List<Integer> reportedPeptideIds = webserviceRequest.getReportedPeptideIds();
    		if ( reportedPeptideIds == null || reportedPeptideIds.isEmpty() ) {
    			log.warn( "No reportedPeptideIds.  projectSearchIds: " + projectSearchIds );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		Set<Integer> searchIds = new HashSet<>();
    		
    		for ( Integer projectSearchId : projectSearchIds ) {
    			Integer searchId =	searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
    			if ( searchId == null ) {
        			log.warn( "projectSearchId not in DB:" + projectSearchId );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			searchIds.add( searchId );
    		}
			
    		List<ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item> searcherResultList = 
    				reportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Searcher
    				.getReportedPeptideStrings_For_ReportedPeptideIds_SearchIds( reportedPeptideIds, searchIds );
			
    		Map<Integer, WebserviceResultPer_ReportedPeptideId> reportedPeptideStringResult = new HashMap<>();
			
    		for ( ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item searcherResultItem : searcherResultList ) {
    			
    			WebserviceResultPer_ReportedPeptideId subResult = new WebserviceResultPer_ReportedPeptideId();
    			subResult.setReportedPeptideString( searcherResultItem.getReportedPeptideString() );
    			
    			reportedPeptideStringResult.put( searcherResultItem.getReportedPeptideId(), subResult );
    		}
    		
    		//  Validate all ReportedPeptideId found in DB
    		
    		List<Integer> reportedPeptideIds_NotFoundIn_reportedPeptideStringResult = new ArrayList<>( reportedPeptideIds.size() );
    		
    		boolean foundAllReportedPeptideIdsForProjectSearchIds = true;
    		
    		for ( Integer reportedPeptideId : reportedPeptideIds ) {
    			if ( ! reportedPeptideStringResult.containsKey( reportedPeptideId ) ) {
    				//  proteinSequenceVersionId not found in DB for Project Search Ids
    				
    				foundAllReportedPeptideIdsForProjectSearchIds = false;
    				
    				reportedPeptideIds_NotFoundIn_reportedPeptideStringResult.add( reportedPeptideId );
    				
    				//  Really need better response
//    				throw new IllegalArgumentException( "proteinSequenceVersionId not found in DB for provided Project Search Ids: " + proteinSequenceVersionId );  // TODO need better handling 
    			}
    		}
    		
    		if ( ! foundAllReportedPeptideIdsForProjectSearchIds ) {
    			String msg = "For projectSearchIds: " + projectSearchIds
    					+ ", Failed to get Reported Peptide Strings for Reported Peptide Ids: " + reportedPeptideIds_NotFoundIn_reportedPeptideStringResult;
    			log.warn( msg );
    		}

    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.reportedPeptideStrings = reportedPeptideStringResult;
    		webserviceResult.foundAllReportedPeptideIdsForProjectSearchIds = foundAllReportedPeptideIdsForProjectSearchIds;

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
    		
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    
    
    //////////////////////////////////////////
    
    //   Webservice Request and Result
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private List<Integer> projectSearchIds;
    	private List<Integer> reportedPeptideIds;
    	
		public List<Integer> getProjectSearchIds() {
			return projectSearchIds;
		}
		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
		public List<Integer> getReportedPeptideIds() {
			return reportedPeptideIds;
		}
		public void setReportedPeptideIds(List<Integer> reportedPeptideIds) {
			this.reportedPeptideIds = reportedPeptideIds;
		}


    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private Map<Integer, WebserviceResultPer_ReportedPeptideId> reportedPeptideStrings;
    	private boolean foundAllReportedPeptideIdsForProjectSearchIds;

		public boolean isFoundAllReportedPeptideIdsForProjectSearchIds() {
			return foundAllReportedPeptideIdsForProjectSearchIds;
		}
		public void setFoundAllReportedPeptideIdsForProjectSearchIds(boolean foundAllReportedPeptideIdsForProjectSearchIds) {
			this.foundAllReportedPeptideIdsForProjectSearchIds = foundAllReportedPeptideIdsForProjectSearchIds;
		}
		public Map<Integer, WebserviceResultPer_ReportedPeptideId> getReportedPeptideStrings() {
			return reportedPeptideStrings;
		}
		public void setReportedPeptideStrings(Map<Integer, WebserviceResultPer_ReportedPeptideId> reportedPeptideStrings) {
			this.reportedPeptideStrings = reportedPeptideStrings;
		}
    }
    
    public static class WebserviceResultPer_ReportedPeptideId {
        
    	private String reportedPeptideString;

		public String getReportedPeptideString() {
			return reportedPeptideString;
		}
		public void setReportedPeptideString(String reportedPeptideString) {
			this.reportedPeptideString = reportedPeptideString;
		}
    }

    
}


